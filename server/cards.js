const express = require("express");
const Property = require('./models/property');
const PropertyInfo = require('./models/propertyInfo');
const Company = require('./models/company');
const CompanyInfo = require('./models/companyInfo');
const Manager = require('./models/manager');
const Renter = require('./models/renter');
const RenterInfo = require('./models/renterInfo');
const router = express.Router();

router.get('/add-coop', async (req, res) => {
    const id = req.body.id;

    const manager = await Manager.findOne({username: req.body.username})
    const company = await Company.findOne({'companyInfo.name': manager.company.companyInfo.name})
    const property = await Property.findById(id)

    const foundCoop = await company.find({myCoops: {$elemMatch: {_id: id}}})
    if (foundCoop === null) {
        company.myCoops.addToSet(property.propertyInfo)
        await company.save()
        manager.company = company
        await manager.save()
    }
})

// Route to add a card for testing use
router.get('/add-card', async (req, res) => {
    const newCompanyInfo = new CompanyInfo({
        name: "Campus Edge",
        address: "134 Pierce St",
        site: "www.americancampus.com/student-apartments/in/west-lafayette/campus-edge-on-pierce",
        email: "CampusEdgeonPierce@AmericanCampus.com",
        phone: "(765) 535-1349"
    });

    const newCompany = new Company({
        companyInfo: newCompanyInfo
    });

    const newPropertyInfo = new PropertyInfo({
        image: "filler link",
        propertyName: "Studio A",
        address: "134 Pierce St",
        beds: 1,
        baths: 1,
        cost: 1899,
        sqft: 0,
        distance: 0.4,
        amenities: ["Gym","Pool"],
        utilities: ["Trash", "Sewage", "Internet"],
        featured: false,
        saves: 0
    });

    const newProperty = new Property({
        propertyInfo: newPropertyInfo,
        companyInfo: newCompanyInfo,
        isVerified: false
    });

    const existingCompany = await Company.findOne({'companyInfo.name': newCompanyInfo.name});
    if (existingCompany) {
        const existingProperty = await Property.findOne({'propertyInfo.name': newPropertyInfo.name, 'propertyInfo.address': newPropertyInfo.address});
        if (!existingProperty) {
            newProperty.companyInfo = existingCompany.companyInfo;
            existingCompany.myCoops.addToSet(newPropertyInfo);
            newPropertyInfo.save();
            newProperty.save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            res.status(200).send("Property already exists")
        }
    } else {
        newCompany.myCoops.addToSet(newPropertyInfo);
        newCompanyInfo.save();
        newCompany.save();
        newPropertyInfo.save();
        newProperty.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

router.post('/get-company', (req, res) => { //company info and my coops on company object
    Company.findOne({'companyInfo.name': req.body.companyName})
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/getCompanyInfo', (req, res) => {
    companyName = req.body.companyName;
    Company.findOne({'companyInfo.name': companyName})
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/sendCompanyName', (req, res) => {
    companyName = req.body.companyName;
    Property.find({'companyInfo.name': companyName})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

// Route to get all cards
router.get('/all-cards', (req, res) => {
    Property.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/unverified-cards', (req, res) => {
    Property.find({ isVerified: false })  
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Route to add saved property
router.post('/update-saves', async (req, res) => {
    const id = req.body.id
    const renter = await Renter.findOne({username: req.body.username})
    const property = await Property.findById(id)
    const coopExists = renter.renterInfo.favCoops.some(coop => coop._id.toString() === property._id.toString());
    console.log(coopExists)
    const company = await Company.findOne({'companyInfo.name': property.companyInfo.name})
    company.myCoops.pull(property.propertyInfo._id)
    await company.save()
    if (!coopExists) { //add save
        await PropertyInfo.findOneAndUpdate({propertyName: property.propertyInfo.propertyName}, {$set:{'saves': property.propertyInfo.saves + 1}})
        const updatedProperty = await Property.findByIdAndUpdate(id, {$set:{'propertyInfo.saves': property.propertyInfo.saves + 1}}, {'returnDocument': 'after'})
        renter.renterInfo.favCoops.push(updatedProperty)
        renter.save()
        company.myCoops.push(updatedProperty.propertyInfo)
    } else { //remove save
        renter.renterInfo.favCoops.pull(property._id)
        renter.save()
        await PropertyInfo.findOneAndUpdate({propertyName: property.propertyInfo.propertyName}, {$set:{'propertyInfo.saves': property.propertyInfo.saves - 1}})
        const updatedProperty = await Property.findByIdAndUpdate(id, {$set:{'propertyInfo.saves': property.propertyInfo.saves - 1}}, {'returnDocument': 'after'})
        company.myCoops.push(updatedProperty.propertyInfo)
    }
    await company.save()
    const managers = await Manager.find({'company.companyInfo.name': company.companyInfo.name})
    managers.forEach(async function(manager) {
        manager.company = company
        manager.save()
    })

    const mates = await Renter.find({'coopmates': {$elemMatch: {'_id': renter.renterInfo._id.toString().toLowerCase()}}})
    mates.forEach(async function(mate) {
        mate.coopmates.pull(renter.renterInfo._id)
        await mate.save()
        mate.coopmates.push(renter.renterInfo)
        mate.save()
    })

    property.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//save coopmates
router.post('/update-coopmates', async (req, res) => {
    try {
        const currentUser = req.body.currentUser;
        const coopmateUsername = req.body.coopmate.username;
        const renter = await Renter.findOne({ username: currentUser.username });
        const coopmate = await Renter.findOne({ username: coopmateUsername });

        if (!coopmate) {
            return res.status(404).json({ error: 'Coopmate not found' });
        }

        /* only adds coopmates that arent null bc for some reason if the array is empty it adds a null */
        renter.coopmates = renter.coopmates.filter(coopmate => coopmate !== null);

        /* this is just a check to print the coopmate */
        renter.coopmates.map(mate => console.log(mate._id.toString()))

        /* checks if coopmate exists in the renter array */
        const coopmateExists = renter.coopmates.some(mate => mate._id.toString() === coopmate.renterInfo._id.toString());
        if (!coopmateExists) {
            console.log("ok doesnt exist")
            /* add coopmate */
            renter.coopmates.push(req.body.coopmate.renterInfo);
        } else {
            console.log("ok no duplicates pls")
            /* if coopmate exists, remove */
            renter.coopmates.pull(coopmate.renterInfo._id)
            renter.coopmates = renter.coopmates.filter(mate => mate._id.toString() !== coopmate._id.toString());
        }
        await renter.save();
        res.status(200).json({ message: 'Coopmates updated successfully', coopmates: renter.coopmates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Route to get featured cards
router.get('/featured-cards', (req, res) => {
    Property.find({'propertyInfo.featured': true})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post("/get-featured", async (req, res) => {
    try {
        const propertyId = req.body.id
        // console.log("id:" + propertyId);
        const property = await Property.findOne(
            { _id: propertyId },
        );
        if (property && property.propertyInfo.featured) {
            return res.status(200).send("Property featured");
        } else {
            return res.status(401).send("Property not featured");

        }

    } catch (err) {
        console.log(err)
        res.status(500).send("Error finding property");
    }
})

router.post("/request-featured", async (req, res) => {
    try {
        const propertyId = req.body.id
        // console.log("id:" + propertyId);
        const property = await Property.findOne(
            { _id: propertyId },
        );
        if (property && !property.propertyInfo.featureRequest) {
            property.propertyInfo.featureRequest = true;
            await property.save();
            return res.status(200).send("Property feature request sent");
        } else {
            return res.status(401).send("Property already featured");

        }

    } catch (err) {
        console.log(err)
        res.status(500).send("Error finding property");
    }
})

router.get("/get-feature-request", async (req, res) => {
    Property.find({'propertyInfo.featureRequest': true})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

// Route to get my coops cards
router.post('/my-coops-cards', async (req, res) => {
    const currentManager = await Manager.findOne({username: req.body.username})
    currentManager.company.myCoops
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Route to get fav coops cards
router.post('/fav-coops-cards', async (req, res) => {
    const currentRenter = await Renter.findOne({username: req.body.username}, 'renterInfo.favCoops -_id') //format: {"renterInfo":{"favCoops":[{},{}]}}
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

/*testing functions

// for testing use (create a property from each property info and attach company)
router.get('/link-cards', async (req, res) => {
    await Property.deleteMany({});
    const existingPropertyInfo = await PropertyInfo.find({});
    var counter = 0;
    existingPropertyInfo.forEach(async function(prop) {
        const existingCompany = await Company.findOne({'companyInfo.address': prop.address})
        const newProperty = new Property({
            propertyInfo: prop,
            companyInfo: existingCompany.companyInfo
        });

        newProperty.save()
        .then(() => {
            counter++;
        })
        .catch((err) => {
            console.log(err);
        });
    });

    res.status(200).send(`Linked ${counter} properties`)
});

router.get('/link-coops', async (req, res) => {
    const property = await Property.find({})
    property.forEach(async function(prop) {
        const company = await Company.findOne({'companyInfo.name': prop.companyInfo.name})
        const propertyInfo = await PropertyInfo.findOne({'propertyName': prop.propertyInfo.propertyName})

        company.myCoops.addToSet(propertyInfo);
        await company.save()
        .catch((err) => {
            console.log(err);
        });
    });
    res.status(200).send("Linked Coops")
})

router.get('/update-schema', async (req,res) => {
    await Renter.deleteMany({})
    await RenterInfo.deleteMany({})
    await Property.deleteMany({})
    await Company.deleteMany({"companyInfo.site": "site"})
    await CompanyInfo.deleteMany({site: "site"})

    await PropertyInfo.updateMany({}, {$unset: ["image", "utilities"]})
    await PropertyInfo.updateMany({}, {$set: { "image": ["link1", "link2"], "utilities": ["Electricity", "Water", "Gas", "Trash", "Sewage", "Internet"]}})
    await Property.updateMany({}, {$unset: ["propertyInfo.image", "propertyInfo.utilities"]})
    await Property.updateMany({}, {$set: { "propertyInfo.image": ["link1", "link2"], "propertyInfo.utilities": ["Electricity", "Water", "Gas", "Trash", "Sewage", "Internet"]}})
    await Company.updateMany({}, {$set: { "myCoops": [], "tours": []}})

    const companyInfo = await CompanyInfo.find({})
    companyInfo.forEach(async function(info) {
        const newCompany = new Company({
            companyInfo: info,
            myCoops: [],
            tours: []
        });
        await newCompany.save()
    })

    const propertyInfo = await PropertyInfo.find({})
    propertyInfo.forEach(async function (info) {
        var company = await Company.findOneAndUpdate({'companyInfo.address': info.address}, {$push: {myCoops: info}})
        if (company == null) {
            const newName = info.propertyName + " Company"
            var existingCompany = await CompanyInfo.findOne({name: newName})
            if (existingCompany != null) {

            }
            const newCompanyInfo = new CompanyInfo({
                name: info.propertyName + " Company",
                address: info.address,
                site: "site",
                email: "email",
                phone: "phone"
            });
            await newCompanyInfo.save()

            const newCompany = new Company({
                companyInfo: newCompanyInfo,
                myCoops: [info],
                tours: []
            });
            await newCompany.save()
            company = newCompany
        }

        const newProperty = new Property({
            propertyInfo: info,
            companyInfo: company.companyInfo
        });

        await newProperty.save()
    })

    await Manager.updateMany({}, {$unset: company})
    await Manager.updateMany({}, {$set: {phone: "1234567890"}})
    const rise = await Company.findOne({'companyInfo.name': "RISE"})
    const ce = await Company.findOne({'companyInfo.name': "Campus Edge"})
    await Manager.updateOne({username: "donahue.ethanj@gmail.com"}, {$set: {company: ce}})
    await Manager.updateOne({username: "test@"}, {$set: {company: ce}})

    const managers = await Manager.find({})
        managers.forEach(async function(manager) {
            const myCoops = manager.company.myCoops
            myCoops.forEach(async function(coop) {
                coop.image = []
                await coop.save()
            })
            await manager.save()
        })
        const companies = await Company.find({})
        companies.forEach(async function(company) {
            const myCoops = company.myCoops
            myCoops.forEach(async function(coop) {
                coop.image = []
                await coop.save()
            })
            await company.save()
        })
})

end of testing functions */

module.exports = router;