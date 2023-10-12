const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/user.js');
const cookieParser = require("cookie-parser");
const sendVerificationEmail = require("./emailVerify.js");
const cors = require('cors');

const router = express.Router();
router.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
};

router.use(cors(corsOptions));

const secretKey = "E.3AvP1]&r7;-vBSAL|3AyetV%H*fIEy";

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
};

router.get("/authorize", authorization, (req, res) => {
  res.status(200).json({ message: 'Authorized', user: req.user });
});


router.get("/secret", authorization, (req, res) => {
  return res.send("Super secret page");
});


router.get("/users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

const isEmailValid = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};


router.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username });

  // if (!isEmailValid(req.body.username)) {
  //   return res.status(400).send("Invalid email format");
  // }

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
        const verificationToken = jwt.sign(
          {
            username: req.body.username,
          }, secretKey, { expiresIn: "10m" }
        );

        sendVerificationEmail(newUser.username, verificationToken);

        const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
          })
          .status(200)
          .json({ message: "Account creation successful" });
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
      const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
        })
        .status(200)
        .json({ message: "Access granted" });
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

router.get("/logout", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out" });
});


router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  console.log("Token:", token);
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded.username);

    const updatedUser = await User.findOneAndUpdate(
      { username: decoded.username },
      { isVerified: true },
      { new: true }
    );
    console.log("Updated User:", updatedUser);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    return res.send("Email verified");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Email verification failed");
  }
});


//only for testing purposes
router.get("/clearUsers", async (req, res) => {
  try {
    await User.deleteMany({});
    res.send("All users deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error clearing users");
  }
});

module.exports = router;
