const express = require("express");
const cors = require("cors");
const authRouter = require("./auth");
const mongoose = require('mongoose');
const cardRoutes = require('./cards'); 
const app = express();

const dbURI = 'mongodb+srv://chrisqiu52:oe7O2bahWRmXJjOp@cluster0.xe4cgpv.mongodb.net/DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  //waits until connected to db incase read/write is performed before db connection
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/auth", authRouter);
app.use('/cards', cardRoutes);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
