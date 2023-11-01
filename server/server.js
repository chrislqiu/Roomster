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
  const data = req.body;
  console.log(data)

  const token = (req.headers.cookie).split('; ')[0].split('=')[1];
  const decoded = jwt.verify(token, secretKey);
  const username = decoded.username
  const manager = await Manager.findOne({username: username})

  const updatedCompanyInfo = await CompanyInfo.findOneAndUpdate({name: manager.company.companyInfo.name}, {name: data.company.name, address: data.company.address, phone: data.company.phone}).setOptions({returnDocument: after})
  const updatedCompany = await Company.findOneAndUpdate({'companyInfo.name': manager.company.companyInfo.name}, {companyInfo: updatedCompanyInfo}).setOptions({returnDocument: after})
  const updatedManager = await Manager.findOneAndUpdate({username: username}, {email: data.email, phone: data.phone, bio: data.bio, company: updatedCompany}).setOptions({returnDocument: after})

  updatedCompanyInfo.save()
  updatedCompany.save()
  updatedManager.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
      console.log(err);
  });
  
})

app.post('/sendRenterProfile', async (req,res) => {
  const data = req.body.renterInfo;

  const token = (req.headers.cookie).split('; ')[0].split('=')[1];
  const decoded = jwt.verify(token, secretKey);
  const username = decoded.username
  const renter = await Renter.findOne({username: username})
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

  const updatedRenterInfo = await RenterInfo.findOneAndUpdate({name: renter.renterInfo.name}, {name: data.name, age: data.age, email: data.email, phone: data.phone, pfp: data.pfp, livingPreferences: updatedLivingPref}).setOptions({returnDocument: after})
  const updatedRenter = await Renter.findOneAndUpdate({username: username}, {findingCoopmates: req.body.findingCoopmates, renterInfo: updatedRenterInfo}).setOptions({returnDocument: after})

  updatedRenter.save()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
      console.log(err);
  });
})


app.post('/sendProperty', async (req,res) => {
  const data = req.body
  const token = (req.headers.cookie).split('; ')[0].split('=')[1];
  const decoded = jwt.verify(token, secretKey);
  const username = decoded.username
  const manager = await Manager.findOne({username: username})
  console.log(req.body)
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

  const newProperty = new Property({
    propertyInfo: newPropertyInfo,
    companyInfo: existingCompanyInfo
  })

  // const existingCompany = await Company.findOne({'companyInfo.name': manager.company.companyInfo.name})
  // existingCompany.myCoops.push(newProperty)

  //existingCompany.save()
  newProperty.save()
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