const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Renter = require('./models/renter.js');
const RenterInfo = require('./models/renterInfo.js');
const Manager = require('./models/manager.js');
const Company = require('./models/company.js');
const CompanyInfo = require('./models/companyInfo.js');
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

        if (req.body.username && req.body.username !== user.username) {
            return res.status(401).send("Unauthorized");
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


router.get("/renters", (req, res) => {
    Renter.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/managers", (req, res) => {
    Manager.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/current-user", authorization, async (req, res) => {
    const userType = req.cookies.user_type;
    var user = null;
    var username = req.user.username;
    if (userType === "renter") {
        user = await Renter.findOne({ username: username });
    } else if (userType === "manager") {
        user = await Manager.findOne({ username: username });
    }

    if (user === null) {
        return res.status(400).send("User does not exist");
    }

    res.status(200).json({user: user, username: username, user_type: userType})
});

const isEmailValid = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

router.post("/renter-signup", async (req, res) => {
    const existingRenter = await Renter.findOne({ username: req.body.username });
    const existingManager = await Manager.findOne({ username: req.body.username });
    const userType = "renter";

    if (existingRenter || existingManager) {
        return res.status(400).send("User already exists");
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPW = await bcrypt.hash(req.body.password, salt);

        const newRenterInfo = new RenterInfo({
            name: req.body.name,
            email: req.body.email
        });

        newRenterInfo.save();

        const newRenter = new Renter({
            username: req.body.username,
            password: hashedPW,
            renterInfo: newRenterInfo
        });

        newRenter.save()
        .then((result) => {
            const verificationToken = jwt.sign({ username: req.body.username}, secretKey, { expiresIn: "10m" });

            sendVerificationEmail(newRenter.username, verificationToken);

            const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
            return res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    // sameSite: "None",
                })
                .cookie("user_type", userType)
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

router.post("/manager-signup", async (req, res) => {
    const existingManager = await Manager.findOne({ username: req.body.username });
    const existingRenter = await Renter.findOne({ username: req.body.username });
    const userType = "manager";

    if (existingManager || existingRenter) {
        return res.status(400).send("User already exists");
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPW = await bcrypt.hash(req.body.password, salt);

        var existingCompany = await Company.findOne({'companyInfo.name': req.body.companyName});
        if (!existingCompany) {
            const newCompanyInfo = new CompanyInfo({
                name: req.body.companyName,
                address: req.body.address,
                email: req.body.companyEmail,
            }); // the managers personal email and phone are separate from the company ones

            const newCompany = new Company({
                companyInfo: newCompanyInfo
            });

            newCompanyInfo.save();
            newCompany.save();

            existingCompany = newCompany;
        }

        const newManager = new Manager({
            username: req.body.username,
            password: hashedPW,
            name: req.body.managerName,
            email: req.body.managerEmail,
            company: existingCompany
        });

        newManager.save()
        .then((result) => {
            const verificationToken = jwt.sign({ username: req.body.username}, secretKey, { expiresIn: "10m" });

            sendVerificationEmail(newManager.username, verificationToken);

            const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
            return res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    // sameSite: "None",
                })
                .cookie("user_type", userType)
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
    var user = await Renter.findOne({ username: req.body.username });
    var userType = "renter";
    if (user === null) {
        user = await Manager.findOne({ username: req.body.username });
        userType = "manager";
        if (user === null) {
            return res.status(400).send("User does not exist");
        }
    }

    try {
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
            return res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    // sameSite: "None",
                })
                .cookie("user_type", userType)
                .status(200)
                .json({ message: "Access granted" });
        } else {
            res.status(401).send("Access denied");
        }
    } catch {
        res.status(500).send("Error when logging in");
    }
});


router.post("/delete", authorization, async (req, res) => {
    const userType = req.cookies.user_type;
    var user = null;
    if (userType === "renter") {
        user = await Renter.findOne({ username: req.body.username });
    } else if (userType === "manager") {
        user = await Manager.findOne({ username: req.body.username });
    }

    if (!user) {
        return res.status(400).send("User does not exist");
    }

    try {
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            if (userType === "renter") {
                await RenterInfo.deleteOne({ _id: user.renterInfo._id});
                await Renter.deleteOne({ username: req.body.username });
            } else if (userType === "manager") {
                await Manager.deleteOne({ username: req.body.username });
            }
            res.clearCookie("access_token").clearCookie("user_type");
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
        .clearCookie("user_type")
        .status(200)
        .json({ message: "Logged out" });
});

router.post("/change-password", authorization, async (req, res) => {
    const userType = req.cookies.user_type;
    var user = null;
    if (userType === "renter") {
        user = await Renter.findOne({ username: req.body.username });
    } else if (userType === "manager") {
        user = await Manager.findOne({ username: req.body.username });
    }

    if (!user) {
        return res.status(400).send("User does not exist");
    }

    try {
        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

        if (isPasswordValid) {
            const salt = await bcrypt.genSalt();
            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

            if (userType === "renter") {
                await Renter.updateOne({ username: req.user.username }, { password: hashedNewPassword });
            } else if (userType === "manager") {
                await Manager.updateOne({ username: req.user.username }, { password: hashedNewPassword });
            }

            const newToken = jwt.sign({ username: req.user.username }, secretKey, { expiresIn: '1h' });

            res.cookie("access_token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                // sameSite: "None",
            });

            return res.status(200).json({ message: "Password changed successfully" });
        } else {
            res.status(401).send("Incorrect current password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error changing password");
    }
});

router.get("/check-verify", authorization, async (req, res) => {
    try {
        const userType = req.cookies.user_type;
        var user = null;
        if (userType === "renter") {
            user = await Renter.findOne({ username: req.body.username });
        } else if (userType === "manager") {
            user = await Manager.findOne({ username: req.body.username });
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.isVerified) {
            return res.status(200).json({user});
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error checking user verification");
    }
});

router.get("/verify/:token", async (req, res) => {
    const { token } = req.params;
    console.log("Token:", token);
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded.username);

        const userType = req.cookies.user_type;
        var updatedUser = null;
        if (userType === "renter") {
            updatedUser = await Renter.findOneAndUpdate(
                { username: decoded.username },
                { isVerified: true },
                { new: true }
            );
        } else if (userType === "manager") {
            updatedUser = await Manager.findOneAndUpdate(
                { username: decoded.username },
                { isVerified: true },
                { new: true }
            );
        }

        console.log("Updated User:", updatedUser);
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        return res.redirect("http://localhost:3001/VerifyPage");
        // return res.send("Email verified");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Email verification failed");
    }
});

//only for testing purposes
router.get("/clearUsers", async (req, res) => {
    try {
        await RenterInfo.deleteMany({});
        await Renter.deleteMany({});
        await Manager.deleteMany({});
        res.send("All users deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error clearing users");
    }
});

module.exports = router;