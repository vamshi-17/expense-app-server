const mongoose = require("mongoose");

const connectDB = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB } = process.env;
  const link = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.op06g91.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(link, {
    dbName: MONGODB_DB,
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connection successful.");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error ${err}.`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.");
  });
};

module.exports = connectDB;