const express = require("express");
const RenterInfo = require("./models/renterInfo")
const Renter = require("./models/renter")
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(bodyParser.json());

const Router = express.Router();
  Router.use(cookieParser())
  const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
};

router.use(cors(corsOptions));
const secretKey = "E.3AvP1]&r7;-vBSAL|3AyetV%H*fIEy";

router.get('/saveRProfile', (req, res) => {
    const data = req.body;

    const token = req.cookies.access_token;

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        if (req.body.username !== user.username) {
            return res.status(401).send("Unauthorized");
        }
        req.user = user;
    })

    const newRenterInfo = new RenterInfo({
        name: data.renterInfo.name,
        age: data.renterInfo.age,
        email: data.renterInfo.email,
        phone: data.renterInfo.phone,
        pfp: data.renterInfo.pfp,
        livingPreferences: {
            pets: data.renterInfo.livingPreferences.pets,
            smoke: data.renterInfo.livingPreferences.smoke,
            studious: data.renterInfo.livingPreferences.studious,
            cleanliness: data.renterInfo.livingPreferences.cleanliness,
            guestFreq: data.renterInfo.livingPreferences.guestFreq,
            sleepSchedule: {
                from: data.renterInfo.livingPreferences.sleepSchedule.from,
                to: data.renterInfo.livingPreferences.sleepSchedule.to
            }
        }
    })

    const newRenter = new Renter({
        username: req.body.username,
        findingCoopmates: data.findingCoopmates,
        renterInfo: newRenterInfo
    })

    newRenter.save((err) => {
        if (err) {
            console.error('ERROR SAVING: ', err);
            res.status(500).json({error: 'ERROR SAVING'});
        } else {
            console.log("DATA SAVED YAY");
            res.json({message: 'DATA SAVED'});
        }
    })
})

module.exports = router;
