require("dotenv").config();
const connection = require("./app/models/connection");
const express = require("express");
const app = express();
const passport = require("passport");
const { jwtStrategy } = require("./configs/passport");
const routes = require("./app/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

app.use(compression());
app.use(cors("*"));

connection();

app.get("/", (req, res) => {
  res.send(`<h1>Process Traceability App Running</h1>`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;
