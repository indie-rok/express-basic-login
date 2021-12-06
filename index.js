const express = require("express");

const app = express();

const usersRouter = require("./controllers/users");
const tokensRouter = require("./controllers/tokens");

app.use(express.json());
app.use("/", usersRouter);
app.use("/", tokensRouter);

app.listen(5000, () => {
  console.log("ready :)");
});
