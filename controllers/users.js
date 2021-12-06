const express = require("express");
const router = express.Router();
const connection = require("../db");

const User = require("../models/User");

router.get("/users", (req, res) => {
  const user = new User();

  user.getAllUsers().then((results) => {
    res.send(results[0]);
  });
});

router.post("/users", (req, res) => {
    console.log(req.body)
  const user = new User(req.body.email, req.body.password);

  const results = user.validate();

  if (results.error) {
    res.status(400).send({ error: results.error.details });
  } else {
    user.findOne().then((results) => {
      if (results[0].length > 0) {
        res.status(400).send({ error: "Email taken :(" });
      } else {
        user.create();
        res.status(201).send({ msg: "User created" });
      }
    });
  }
});

module.exports = router;
