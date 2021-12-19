console.clear();

require("./config/mongoConnection");
require("dotenv").config();

const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URL });
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const express = require("express");
const cors = require("cors");

const configRoutes = require("./routes");
const firebase = require("./middlewares/firebase");

const elasticsearch = require("elasticsearch");
var connectionString = process.env.SEARCHBOX_URL;
var elasticsearch_client = new elasticsearch.Client({
  host: connectionString,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use("*", async (req, res, next) => {
  console.log(req.originalUrl);
  if (
    req.originalUrl === "/users/readByEmail" ||
    req.originalUrl === "/users/create"
  ) {
    next();
  } else {
    firebase.decodeToken;
  }
});

app.use("*", async (req, res, next) => {
  let date = new Date().toUTCString();
  let reqmethod = req.method;
  let reqroute = req.originalUrl;
  let message = `[${date}]: ${reqmethod} ${reqroute}`;
  console.log(message);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

configRoutes(app);

app.listen(process.env.PORT, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on PORT ${process.env.PORT}`);
});
