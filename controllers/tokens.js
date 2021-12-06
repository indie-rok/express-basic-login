const express = require("express");
const router = express.Router();
const connection = require("../db");

const User = require("../models/User");

router.post("/tokens", (req, res) => {
  const user = new User(req.body.email, req.body.password); //user input

  const validationResult = user.validate();

  if (validationResult.error) {
    res.send({ error: "Validation Error" });
  } else {
    user.findOne().then((result) => {
      if (result[0].length === 1) {
        const passwordInDb = result[0][0].password;

        if (req.body.password === passwordInDb) {
          const token = user.calculateToken()

          user.updateTokeninDb()

          res.send({ msg: token });
        } else {
          res.status(401).send({ msg: "You are not who you said you are" });
        }
      } else {
        res.send({ error: "Wrong user" });
      }
    });
  }
});

module.exports = router;
