const express = require("express");
const Property = require('./models/property');
const PropertyInfo = require('./models/propertyInfo');
const Company = require('./models/company');
const CompanyInfo = require('./models/companyInfo');
const Manager = require('./models/manager');
const Renter = require('./models/renter');
const router = express.Router();

// for testing use
router.get('/link-cards', async (req, res) => {
    const existingCompany = await Company.findOne({'companyInfo.name': 'RISE'});
    const existingPropertyInfo = await PropertyInfo.find({});
    existingPropertyInfo.forEach(function(prop) {
        const newProperty = new Property({
            propertyInfo: prop,
            companyInfo: existingCompany.companyInfo
        });

        newProperty.save()
        .catch((err) => {
            console.log(err);
        });
    });
});

// Route to add a card for testing use
router.get('/add-card', async (req, res) => {
    const newCompanyInfo = new CompanyInfo({
        name: "RISE",
        address: "100 S Chauncey Ave",
        site: "riseonchauncey.com",
        email: "info@riseonchauncey.com",
        phone: "(765) 876-3177"
    });

    const newCompany = new Company({
        companyInfo: newCompanyInfo
    });

    const newPropertyInfo = new PropertyInfo({
        image: "filler link",
        propertyName: "RISE on Chauncey: One Bedroom",
        address: "100 S Chauncey Ave",
        beds: 1,
        baths: 1,
        cost: 2089,
        sqft: 426,
        distance: 0.5,
        amenities: ["gym","pool","game room"],
        utilities: {
            electricity: true,
            water: true,
            gas: true,
            trash: true,
            sewage: true,
            internet: true,
            laundry: true,
            parking: true,
            furnished: true
        },
        featured: false,
        saves: 0
    });

    const newProperty = new Property({
        propertyInfo: newPropertyInfo,
        companyInfo: newCompanyInfo
    });

    //TODO: fix duplicate property additions
    const existingCompany = await Company.findOne({'companyInfo.name': 'RISE'});
    if (existingCompany) {
        newProperty.companyInfo = existingCompany.companyInfo;
        const addedProp = existingCompany.myCoops.addToSet(newPropertyInfo);
        if (addedProp.length === 1) {
            newPropertyInfo.save();
            newProperty.save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            console.log("not new prop");
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

router.post('/sendCompanyName', (req, res) => {
    console.log(req.body);
    companyName = req.body.companyName;
    console.log(companyName);
    Property.find({'companyInfo.name': companyName})
    .then((result) => {
        console.log(result);
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
router.get('/my-coops-cards', (req, res) => {
    Manager.find({'company.myCoops': {}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Route to get fav coops cards
router.get('/fav-coops-cards', (req, res) => {
    Renter.find({'renterInfo.favCoops': {}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;