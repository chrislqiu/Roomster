const express = require("express");
const PropertyCard = require('./models/propertyCard');
const User = require('./models/user');
const PMUser = require('./models/propertyManagerUser');
const RUser = require('./models/renterUser');
const router = express.Router();

// Route to add a card
router.get('/add-card', (req, res) => {
  const card = new PropertyCard({
    image: 'filler link',
    propertyName: 'The Barracks',
    addr: '123 Daniels Blvd',
    numBed: 3,
    numBath: 2.5,
    cost: 700,
    featured: false
  });

  card.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Route to get all cards
router.get('/all-cards', (req, res) => {
  PropertyCard.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Route to get featured cards
router.get('/featured-cards', (req, res) => {
  PropertyCard.find({featured: true})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Route to get my coops cards
router.get('/my-coops-cards', (req, res) => {
  PMUser.find({companyInformation: {myCoops: {}}})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Route to get fav coops cards
router.get('/fav-coops-cards', (req, res) => {
  RUser.find({favCoops: {}})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
