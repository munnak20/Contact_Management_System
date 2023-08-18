const mongoose = require("mongoose");
const User = require("../models/User");
const { use } = require("../routes/auth");

const connectDB = async () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connection to database established..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
