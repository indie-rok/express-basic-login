const crypto = require("crypto");

const calculateToken = (userEmail = "") => {
  return crypto.createHash("md5").update(userEmail).digest("hex");
};

console.log(calculateToken("hello@email.com"));
