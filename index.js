const express = require("express");
require("./db/config"); // importing config from db, which has db mongoose db connect
const user = require("./db/User");
const User = require("./db/User");
const app = express();
const cors = require("cors");

app.use(express.json()); //middleware to help get body data from api

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});
app.post("/login", async (req, res) => {
    if(req.body.password && req.body.email)
});

app.listen(5000);
