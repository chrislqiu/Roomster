const express = require("express");
const cors = require("cors");
const authRouter = require("./auth");
const mongoose = require('mongoose');
const cardRoutes = require('./cards');

const RenterInfo = require("./models/renterInfo")
const Renter = require("./models/renter")
const Manager = require("./models/manager")
const Company = require("./models/company")
const CompanyInfo = require("./models/companyInfo")
const PropertyInfo = require('./models/propertyInfo')
const Property = require('./models/property')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { after } = require("node:test");

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
app.use(cookieParser())
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

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/auth", authRouter);
app.use('/cards', cardRoutes);
app.post('/sendManagerProfile', async (req, res) => {
  const manager = await Manager.findOne({username: req.body.username})

  const updatedCompanyInfo = new CompanyInfo({
    name: req.body.company.name,
    address: req.body.company.address,
    site: manager.company.companyInfo.site,
    email: manager.company.companyInfo.email,
    phone: req.body.company.phone
  })

  const property = await Property.find({'companyInfo.name': manager.company.companyInfo.name})
  property.forEach(async function(prop) {
    prop.companyInfo = updatedCompanyInfo;
    await prop.save()
  })

  const updatedCompany = await Company.findOne({'companyInfo.name': manager.company.companyInfo.name})
  updatedCompany.companyInfo = updatedCompanyInfo
  await updatedCompany.save()

  const updatedManager = new Manager({
    username: manager.username,
    password: manager.password,
    isVerified: manager.isVerified,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio,
    company: updatedCompany
  })
  manager = updatedManager
  await manager.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
      console.log(err);
  });
})

app.post('/sendRenterProfile', async (req,res) => {
  const data = req.body.renterInfo
  const renter = await Renter.findOne({username: req.body.username})

  const updatedLivingPref = {
      pets: data.livingPreferences.pets,
      smoke: data.livingPreferences.smoke,
      studious: data.livingPreferences.studious,
      cleanliness: data.livingPreferences.cleanliness,
      guestFreq: data.livingPreferences.guestFreq,
      sleepSchedule: {
          from: data.livingPreferences.sleepSchedule.from,
          to: data.livingPreferences.sleepSchedule.to
      }
  }

  const oldRenterInfo = renter.renterInfo
  const updatedRenterInfo = new RenterInfo({
    name: data.name,
    age: data.age,
    email: data.email,
    phone: data.phone,
    pfp: data.pfp,
    livingPreferences: updatedLivingPref
  })

  const updatedRenter = new Renter({
    username: renter.username,
    password: renter.password,
    isVerified: renter.isVerified,
    findingCoopmates: req.body.findingCoopmates,
    renterInfo: updatedRenterInfo,
    coopmates: renter.coopmates
  })
  renter = updatedRenter

  const coopmates = await Renter.find({'coopmates': {$elemMath: {'renterInfo.name': renter.renterInfo.name, 'renterInfo.email': renter.renterInfo.email}}})
  coopmates.forEach(async function(mate) {
    mate.coopmates.pull(oldRenterInfo._id)
    mate.coopmates.addToSet(renter.renterInfo)
    await mate.save()
  })

  await renter.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
      console.log(err);
  });
})

app.post('/sendProperty', async (req,res) => {
  const data = req.body
  const token = req.cookies.access_token;

  // console.log(token1)
  // const token = (req.headers.cookie).split('; ')[0].split('=')[1];
  const decoded = jwt.verify(token, secretKey);
  const username = decoded.username
  const manager = await Manager.findOne({username: username})
  //console.log(req.body)
  const newPropertyInfo = new PropertyInfo({
    image: data.propertyInfo.image,
    propertyName: data.propertyInfo.propertyName,
    address: data.propertyInfo.address,
    beds: data.propertyInfo.beds,
    baths: data.propertyInfo.baths,
    cost: data.propertyInfo.cost,
    sqft: data.propertyInfo.sqft,
    distance: data.propertyInfo.distance,
    amenities: data.propertyInfo.amenities,
    utilities: data.propertyInfo.utilities
  })

  const existingCompanyInfo = await CompanyInfo.findOne({name: manager.company.companyInfo.name})

  // console.log(existingCompanyInfo)

  const newProperty = new Property({
    propertyInfo: newPropertyInfo,
    companyInfo: existingCompanyInfo
  })

  newProperty.save()
  const company = await Company.findOne({"companyInfo.name": manager.company.companyInfo.name})
  company.myCoops.push(newPropertyInfo)
  company.save()
  manager.company.myCoops = company.myCoops
  await manager.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
      console.log(err);
  });
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});