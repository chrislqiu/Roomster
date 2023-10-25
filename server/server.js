const express = require("express");
const cors = require("cors");
const authRouter = require("./auth");
const mongoose = require('mongoose');
const cardRoutes = require('./cards');
const saveMProfileRoutes = require('./sendManagerProfile') 
const managerProfile = require('./models/managerProfile')
const renterProfile = require('./models/renterProfile')
const Manager = require("./models/manager")
const Company = require("./models/company")
const CompanyInfo = require("./models/companyInfo")
const app = express();

const dbURI = 'mongodb+srv://chrisqiu52:oe7O2bahWRmXJjOp@cluster0.xe4cgpv.mongodb.net/DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  //waits until connected to db incase read/write is performed before db connection
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

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
  const newRenterProfile = new renterProfile(data);
  newRenterProfile.save()
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
