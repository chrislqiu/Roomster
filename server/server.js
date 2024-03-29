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
const Tour = require('./models/tour')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { after } = require("node:test");
const compression = require('compression');
const AWS = require('aws-sdk');
const multer = require('multer');

const app = express();


AWS.config.update({
  accessKeyId: 'AKIAQ5PJSTNAYH4XK3UV',
  secretAccessKey: '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',
  region: 'us-east-2',
});

const s3 = new AWS.S3();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.use(compression());

const dbURI = 'mongodb+srv://chrisqiu52:oe7O2bahWRmXJjOp@cluster0.xe4cgpv.mongodb.net/DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  //waits until connected to db incase read/write is performed before db connection
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

const router = express.Router();
router.use(cookieParser())
// router.use(compression())
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
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
  var manager = await Manager.findOne({ username: req.body.username })
  // console.log(req.body)
  const updatedCompanyInfo = new CompanyInfo({
    name: req.body.company.name,
    address: req.body.company.address,
    site: req.body.company.site,
    email: req.body.company.email,
    phone: req.body.company.phone
  })

  const property = await Property.find({ 'companyInfo.name': manager.company.companyInfo.name })
  property.forEach(async function (prop) {
    prop.companyInfo = updatedCompanyInfo;
    await prop.save()
  })

  const updatedCompany = await Company.findOne({ 'companyInfo.name': manager.company.companyInfo.name })
  updatedCompany.companyInfo = updatedCompanyInfo
  await updatedCompany.save()

  const update = await Manager.findOneAndUpdate({ username: username }, { name: req.body.name, email: req.body.email, phone: req.body.phone, bio: req.body.bio, company: updatedCompany }, { new: true })

  await update.save()

    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post('/sendRenterProfile', async (req, res) => {
  const data = req.body.renterInfo
  const token = req.cookies.access_token
  const decoded = jwt.verify(token, secretKey)
  const username = decoded.username
  var renter = await Renter.findOne({ username: username })
  console.log(data)

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

  const updatedRenterInfo = await RenterInfo.findOneAndUpdate({_id: renter.renterInfo._id}, {name: data.name, age: data.age, gender: data.gender, email: data.email, phone: data.phone, pfp: data.pfp, livingPreferences: updatedLivingPref}, {new: true})

  const update = await Renter.findOneAndUpdate({ username: username }, { findingCoopmates: req.body.findingCoopmates, renterInfo: updatedRenterInfo}, { new: true })
  console.log(update)

  const mates = await Renter.find({'coopmates': {$elemMatch: {_id: renter.renterInfo._id.toString().toLowerCase()}}})

  mates.forEach(async function(mate) {
    console.log(mate)
    mate.coopmates.pull(updatedRenterInfo._id)
    await mate.save()
    mate.coopmates.push(updatedRenterInfo)
    await mate.save()
    console.log(mate)
  })

  await update.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
})

async function getImageFromS3(imageKey) {
  const params = {
    Bucket: 'roomster',
    Key: imageKey,
  };

  const data = await s3.getObject(params).promise();
  return data.Body;
}

async function listObjectsFromS3(prefix) {
  const params = {
    Bucket: 'roomster',
    Prefix: prefix,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents;
  } catch (error) {
    console.error('Error listing objects from S3:', error);
    throw error;
  }
}


app.get('/images/:objectId', async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const objectsList = await listObjectsFromS3(`${objectId}/`);

    const images = await Promise.all(objectsList.map(async (object) => {
      const imageName = object.Key.split('/').pop();
      const image = await getImageFromS3(`${objectId}/${imageName}`);
      return { imageName, image };
    }));

    res.json({ success: true, images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const updateOrCreateObject = async (objectId, file) => {
  const params = {
    Bucket: 'roomster',
    Key: `${objectId}/${file.originalname}`,
    Body: file.buffer,
  };

  await s3.putObject(params).promise();
}

const deletePictures = async (folderPath) => {
  const params = {
    Bucket: 'roomster',
    Prefix: folderPath,
  };

  const objects = await s3.listObjectsV2(params).promise();

  if (objects.Contents.length > 0) {
    const deleteParams = {
      Bucket: 'roomster',
      Delete: { Objects: objects.Contents.map(obj => ({ Key: obj.Key })) },
    };

    await s3.deleteObjects(deleteParams).promise();
  }
}


async function uploadToS3(images, objectId) {
  await deletePictures(`${objectId}/`);
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const file = {
      buffer: buffer,
      originalname: `image_${i + 1}.jpg`,
    };

    await updateOrCreateObject(objectId, file);
  }
}


app.post('/sendProperty', async (req, res) => {
  const data = req.body
  const token = req.cookies.access_token;

  // console.log(token1)
  // const token = (req.headers.cookie).split('; ')[0].split('=')[1];
  const decoded = jwt.verify(token, secretKey);
  const username = decoded.username
  const manager = await Manager.findOne({ username: username })
  const newInfo = {
    image: [],
    propertyName: data.propertyInfo.propertyName,
    address: data.propertyInfo.address,
    beds: data.propertyInfo.beds,
    baths: data.propertyInfo.baths,
    cost: data.propertyInfo.cost,
    sqft: data.propertyInfo.sqft,
    distance: data.propertyInfo.distance,
    amenities: data.propertyInfo.amenities,
    utilities: data.propertyInfo.utilities,
    latitude: data.propertyInfo.latitude,
    longitude: data.propertyInfo.longitude
  }
  var newProperty;

  const company = await Company.findOne({ "companyInfo.name": manager.company.companyInfo.name })
  if (data.propertyInfo._id != '') {
    const updatePropertyInfo = await PropertyInfo.findByIdAndUpdate(data.propertyInfo._id, newInfo, { new: true })
    //updatePropertyInfo.save();
    //console.log(updatePropertyInfo)
    newProperty = await Property.findOneAndUpdate({ 'propertyInfo._id': data.propertyInfo._id }, { propertyInfo: updatePropertyInfo }, { new: true })
    company.myCoops.pull(data.propertyInfo._id);
    company.myCoops.push(updatePropertyInfo)
    uploadToS3(data.propertyInfo.image, data.propertyInfo._id)

  } else {
    //console.log(req.body)
    const newPropertyInfo = new PropertyInfo(newInfo)
    // console.log(newPropertyInfo)
    const existingCompanyInfo = await CompanyInfo.findOne({ name: manager.company.companyInfo.name })
    const savedPropertyInfo = await newPropertyInfo.save();
    const newPropertyInfoId = savedPropertyInfo._id;
    // console.log(existingCompanyInfo)
    newProperty = new Property({
      propertyInfo: newPropertyInfo,
      companyInfo: existingCompanyInfo
    })
    company.myCoops.push(newPropertyInfo)
    uploadToS3(data.propertyInfo.image, newPropertyInfoId)

  }
  newProperty.save()
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

app.post('/reqTour', async (req, res) => {
  const data = req.body.tour

  const tourReq = new Tour({
    username: data.username,
    propertyName: data.propertyName,
    companyName: data.companyName,
    dateTime: data.dateTime,
    status: 'Pending'
  })

  const oldRenter = await Renter.findOne({ username: data.username })
  const oldCompany = await Company.findOne({ "companyInfo.name": data.companyName })
  oldRenter.tours.push(tourReq)
  oldCompany.tours.push(tourReq)

  const updatedRenter = await Renter.findOneAndUpdate({ username: data.username }, { tours: oldRenter.tours }, { new: true })
  const updatedCompany = await Company.findOneAndUpdate({ "companyInfo.name": data.companyName }, { tours: oldCompany.tours }, { new: true })

  updatedRenter.save()
  updatedCompany.save()

  const managers = await Manager.find({ 'company.companyInfo.name': data.companyName })
  managers.forEach(async function (manager) {
    manager.company = updatedCompany
    manager.save()
  })
})

app.post('/delTour', async (req, res) => {

  const data = req.body.tour

  const renterTour = await Renter.findOne({ username: data.username })
  const companyTour = await Company.findOne({ "companyInfo.name": data.companyName })

  const renterRM = renterTour.tours.filter(tour => !(tour.propertyName === data.propertyName && tour.username === data.username && tour.dateTime === data.dateTime))
  const companyRM = companyTour.tours.filter(tour => !(tour.propertyName === data.propertyName && tour.username === data.username && tour.dateTime === data.dateTime))

  const updatedRenter = await Renter.findOneAndUpdate({ username: data.username }, { tours: renterRM }, { new: true })
  const updatedCompany = await Company.findOneAndUpdate({ "companyInfo.name": data.companyName }, { tours: companyRM }, { new: true })
  updatedRenter.save()
  updatedCompany.save()

  const managers = await Manager.find({ 'company.companyInfo.name': data.companyName })
  managers.forEach(async function (manager) {
    manager.company = updatedCompany
    manager.save()
  })
})

app.post('/updateTour', async (req, res) => {
  const data = req.body.tour

  const renterTour = await Renter.findOne({ username: data.username })
  const companyTour = await Company.findOne({ "companyInfo.name": data.companyName })

  const renterRM = renterTour.tours.filter(tour => !(tour.propertyName === data.propertyName && tour.username === data.username && tour.dateTime === data.dateTime))
  const companyRM = companyTour.tours.filter(tour => !(tour.propertyName === data.propertyName && tour.username === data.username && tour.dateTime === data.dateTime))

  renterRM.push(data)
  companyRM.push(data)

  const updatedRenter = await Renter.findOneAndUpdate({ username: data.username }, { tours: renterRM }, { new: true })
  const updatedCompany = await Company.findOneAndUpdate({ "companyInfo.name": data.companyName }, { tours: companyRM }, { new: true })

  updatedRenter.save()
  updatedCompany.save()

  const managers = await Manager.find({ 'company.companyInfo.name': data.companyName })
  managers.forEach(async function (manager) {
    manager.company = updatedCompany
    manager.save()
  })

})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});