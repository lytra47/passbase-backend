const express = require("express");
require("./db/config"); // importing config from db, which has db mongoose db connect
const user = require("./db/User");
const User = require("./db/User");
const app = express();
const cors = require("cors");

app.use(express.json()); //middleware to help get body data from api
app.use(cors()); //middleware to avoid cors errors

app.post("/signup", async (req, res) => {
  let userCheck = await User.find();

  if (userCheck.find((user) => user.email === req.body.email)) {
    res.send({ result: "User already exist!" });
    return;
  }

  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.get("/getpass/:userEmail", async (req, res) => {
  const email = req.params.userEmail;
  if (!email) {
    return res.send({ result: "Invalid " });
  }

  const user = await User.findOne({ email });

  return res.send(user.data);
});

app.put("/savePassword", async (req, res) => {
  const email = req.body.email;
  const data = req.body.data;

  if (!email || !data) {
    return res.send({ result: "Invalid request parameters." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.send({ result: "User not found." });
  }

  const existingItem = user.data.find(
    (item) => item.saveWebsite === data.saveWebsite
  );

  if (existingItem) {
    return res.send({
      result: "Item already exists. Please update it.",
      exist: true,
    });
  }

  user.data.push(data);
  const updatedUser = await user.save();

  res.send({ result: "Data Added" });
});

app.listen(5000);
