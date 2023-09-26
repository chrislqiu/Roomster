const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Simulated user database
const users = [];

router.get("/users", (req, res) => {
    res.json(users);
  });
  

router.post("/signup", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  if (user) {
    return res.status(400).send("User already exists");
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(req.body.password, salt);

    const newUser = { username: req.body.username, password: hashedPW };
    users.push(newUser);
    res.status(201).send("Account created successfully");
  } catch {
    res.status(500).send("Error creating account");
  }
});

router.post("/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (!user) {
    return res.status(400).send("User not found");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Access granted");
    } else {
      res.send("Access denied");
    }
  } catch {
    res.status(500).send("Error when logging in");
  }
});

module.exports = router;
