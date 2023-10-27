const express = require("express");
const cors = require("cors");
const authRouter = require("./auth");
const mongoose = require('mongoose');
const cardRoutes = require('./cards');

const saveMProfileRoutes = require('./sendManagerProfile') 
const RenterInfo = require("./models/renterInfo")
const Renter = require("./models/renter")
const Manager = require("./models/manager")
const Company = require("./models/company")
const CompanyInfo = require("./models/companyInfo")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const dbURI = 'mongodb+srv://chrisqiu52:oe7O2bahWRmXJjOp@cluster0.xe4cgpv.mongodb.net/DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  //waits until connected to db incase read/write is performed before db connection
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  const router = express.Router();
  router.use(cookieParser())
  const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


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

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/auth", authRouter);
app.use('/cards', cardRoutes);
app.post('/sendManagerProfile', async (req, res) => {
  const data = req.body;

  //const newManagerProfile = new managerProfile(data);
  const newCompanyInfo = new CompanyInfo({
    name: data.company.name,
    address: data.company.address,
    phone: data.company.phone
})

const newCompany = new Company({
    companyInfo: newCompanyInfo
})

const newManagerProfile = new Manager({
    name: data.name,
    phone: data.phone,
    email: data.email,
    bio: data.bio,
    company: newCompany
})
  newManagerProfile.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
})

app.post('/sendRenterProfile', async (req,res) => {
  const data = req.body;
  console.log(data)


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

  newRenter.save()
  .then((result) => {
    console.log(result)
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
