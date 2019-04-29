const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  // run mongoseconnect (async works with try catch )
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("mongoDB connected...");
  } catch (err) {
    console.log(err.message);
    // app fail - exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
