const express = require("express");
const PropertyCard = require('./models/propertyCards');
const router = express.Router();

// Route to add a card
router.get('/add-card', (req, res) => {
  const card = new PropertyCard({
    image: 'filler link',
    propertyName: 'The Barracks',
    addr: '123 Daddy Daniels Blvd',
    numBed: 3,
    numBath: 2.5,
    cost: 700
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

module.exports = router;