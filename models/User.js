const connection = require("../db");
const Joi = require("joi");
const crypto = require("crypto");

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(20),
});

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  validate() {
    return schema.validate({ email: this.email, password: this.password });
  }

  findOne() {
    return connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [this.email]);
  }

  create() {
    return connection
      .promise()
      .query("INSERT into users (email, password) VALUES (?,?)", [
        this.email,
        this.password,
      ]);
  }

  calculateToken() {
    return crypto.createHash("md5").update(this.email).digest("hex");
  }

  updateTokeninDb() {
    return connection
      .promise()
      .query("UPDATE users SET token = ? WHERE email = ?", [
        this.calculateToken(),
        this.email,
      ]);
  }

  getAllUsers() {
    return connection.promise().query("SELECT * FROM users");
  }

}
module.exports = User;
