const express = require("express");
const cors = require("cors");
const authRouter = require("./auth"); 
const mongoose = require('mongoose');
const PropertyCard = require('./models/propertyCards')
const app = express();


//connects to mongodb
const dbURI = 'mongodb+srv://chrisqiu52:oe7O2bahWRmXJjOp@cluster0.xe4cgpv.mongodb.net/DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  //waits until connected to db incase read/write is performed before db connection
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//mongoose and Schema test
app.get('/add-card', (req, res) => {
  const card = new PropertyCard({
    image: 'filler link',
    propertyName: 'The Barracks',
    addr: '123 Daddy Daniels Blvd',
    numBed: 3,
    numBath: 2.5,
    cost: 700
  });
  //saves to db
  card.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    });
})

app.get('/all-cards', (req, res) => {
  PropertyCard.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    });
})


app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
