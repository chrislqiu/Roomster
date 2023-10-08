const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/user.js');


const router = express.Router();


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
      res.status(401).send("Access denied");
    }
  } catch {
    res.status(500).send("Error when logging in");
  }
});

router.post("/delete", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send("User does not exist");
  }

  try {
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      await User.deleteOne({ username: req.body.username }); 

      return res.send("User deleted");
    } else {
      res.status(401).send("Incorrect user information");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting account");
  }
});


router.get("/verify/:token", (req, res) => {
  const {token} = req.params;

  jwt.verify(token, 'key', function(err, decoded) {
    if(err){
      console.log(err);
      res.send("Email verification failed");
    } else {
      res.send("Email verified");
    }
  });

});

module.exports = router;
