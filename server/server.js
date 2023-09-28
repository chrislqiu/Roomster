const express = require("express");
const cors = require("cors");
const authRouter = require("./auth"); 
const app = express();

var path = __dirname + '\\'
//app.use(express.static(path))
//app.use(express.urlencoded)
app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
