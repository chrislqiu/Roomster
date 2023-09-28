const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/user.js');


const router = express.Router();

// Simulated user database
const users = [];

router.get("/users", (req, res) => {
  User.find()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
  });
  

router.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(400).send("User already exists");
  }


  try {
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPW,
    });

    newUser.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });

  } catch (err) {
      console.log(err);
      res.status(500).send("Error creating account");
    }
    
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send("User does not exist");
  }
  try {
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      res.send("Access granted");
    } else {
      res.send("Access denied");
    }
  } catch {
    res.status(500).send("Error when logging in");
  }
});

module.exports = router;
