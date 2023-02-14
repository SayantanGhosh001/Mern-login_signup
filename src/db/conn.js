const mongoose = require("mongoose");
require("dotenv").config();
const { ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sayantanGhosh:qAqPFMBYo5SulAAP@cluster0.sy5ip30.mongodb.net/?retryWrites=true&w=majority";
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
