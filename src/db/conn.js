const mongoose = require("mongoose");
require("dotenv").config();
const { ServerApiVersion } = require("mongodb");
const uri = process.env.SECRET_DB;
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("connection successful..");
  })
  .catch((e) => {
    console.log("no connection");
  });
