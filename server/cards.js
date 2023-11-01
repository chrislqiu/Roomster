const express = require("express");
const Property = require('./models/property');
const PropertyInfo = require('./models/propertyInfo');
const Company = require('./models/company');
const CompanyInfo = require('./models/companyInfo');
const Manager = require('./models/manager');
const Renter = require('./models/renter');
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
        companyInfo: newCompanyInfo
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

router.post('/getCompanyInfo', (req, res) => {
    companyName = req.body.companyName;
    CompanyInfo.findOne({name: companyName})
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

// Route to get all cards
router.get('/add-save/:id', async (req, res) => {
    const { id } = req.params;
    const property = await Property.findById(id);
    const saves = property.propertyInfo.saves;
    await Property.findByIdAndUpdate(id, {$set: {'propertyInfo.saves': saves + 1}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

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
router.get('/my-coops-cards', (req, res) => { //TODO: match req username
    Manager.find({'company.myCoops': {}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Route to get fav coops cards
router.get('/fav-coops-cards', (req, res) => { //TODO: match req username
    Renter.find({'renterInfo.favCoops': {}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;