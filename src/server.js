const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config.js");
const mongoose = require("mongoose");

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let UserModel = require("./models/UserModel");

app.get("/users", (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

app.post("/user/", (req, res) => {
  let user = new UserModel();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(user, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`${user.username} successfully saved!`);
    }
  });
});

app.get("/user/:username", (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

app.put("/user/:username", (req, res) => {
  UserModel.findOneAndUpdate(
    { username: req.params.username },
    { $set: req.body },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.delete("/user/:username", (req, res) => {
  UserModel.deleteOne({ username: req.params.username }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

const port = 5000;
app.listen(port, () => console.log(`Serving at http://localhost:${port}`));
