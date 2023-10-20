const express = require("express");
const Property = require('./models/property');
const PropertyInfo = require('./models/propertyInfo');
const Company = require('./models/company');
const CompanyInfo = require('./models/companyInfo');
const User = require('./models/user'); //TODO
const Manager = require('./models/manager');
const Renter = require('./models/renter');
const router = express.Router();

// Route to add a card
router.get('/add-card', (req, res) => {
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

    newCompany.myCoops.push(newPropertyInfo);

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
});

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
    Property.find({ propertyInfo: {featured: true} })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Route to get my coops cards
router.get('/my-coops-cards', (req, res) => {
    Manager.find({ company: {myCoops: {}} })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Route to get fav coops cards
router.get('/fav-coops-cards', (req, res) => {
    Renter.find({ renterInfo: {favCoops: {}} })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;
