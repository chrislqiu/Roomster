const express = require("express");
const Property = require('./models/property');
const PropertyInfo = require('./models/propertyInfo');
const Company = require('./models/company');
const CompanyInfo = require('./models/companyInfo');
const Manager = require('./models/manager');
const Renter = require('./models/renter');
const RenterInfo = require('./models/renterInfo');
const router = express.Router();

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

router.get('/add-coop', async (req, res) => {
    const id = req.body.id;

    const manager = await Manager.findOne({username: req.body.username})
    const company = await Company.findOne({'companyInfo.name': manager.company.companyInfo.name})
    const property = await Property.findById(id)

    const foundCoop = await company.find({myCoops: {$elemMatch: {_id: id}}})
    if (foundCoop === null) {
        company.myCoops.addToSet(property.propertyInfo)
        await company.save()
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
        amenities: ["gym","pool"],
        utilities: {
            electricity: false,
            water: false,
            gas: false,
            trash: true,
            sewage: true,
            internet: true,
            laundry: true,
            parking: false,
            furnished: true
        },
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
    if (!coopExists) { //add save
        //const updatedPropertyInfo = await PropertyInfo.findOneAndUpdate({propertyName: property.propertyInfo.propertyName}, {saves: property.propertyInfo.saves + 1})
        const updatedProperty = await Property.findByIdAndUpdate(id, {$set:{'propertyInfo.saves': property.propertyInfo.saves + 1}}, {'returnDocument': 'after'})
        renter.renterInfo.favCoops.push(updatedProperty)
        renter.save()
        //updatedPropertyInfo.save()
        updatedProperty.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    } else { //remove save
        renter.renterInfo.favCoops.pull(id)
        console.log(renter.renterInfo.favCoops.pull(id))
        //const updatedPropertyInfo = await PropertyInfo.findOneAndUpdate({propertyName: property.propertyInfo.propertyName}, {saves: property.propertyInfo.saves - 1})
        const updatedProperty = await Property.findByIdAndUpdate(id, {$set:{'propertyInfo.saves': property.propertyInfo.saves - 1}}, {'returnDocument': 'after'})
        renter.save()
        //updatedPropertyInfo.save()
        updatedProperty.save()
        .then((result) => {
            console.log(result)
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    }

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

        renter.coopmates = renter.coopmates.filter(coopmate => coopmate !== null);
        //console.log(coopmate)
        //console.log(renter.coopmates)
        renter.coopmates.map(mate => console.log(mate._id.toString()))
        //console.log(coopmate._id.toString())
        const coopmateExists = renter.coopmates.some(mate => mate._id.toString() === coopmate._id.toString());
        //console.log(`coopmateExists: ${coopmateExists}`)
        if (!coopmateExists) {
            console.log("ok doesnt exist")
            renter.coopmates.push(req.body.coopmate);
        } else {
            console.log("ok no duplicates pls")
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

// Route to get my coops cards
router.post('/my-coops-cards', async (req, res) => {
    const currentManager = await Manager.findOne({username: req.body.username})
    const myCoops = await Property.find({'companyInfo.name': currentManager.company.myCoops})
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

module.exports = router;