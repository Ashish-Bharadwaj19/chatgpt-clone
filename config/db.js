const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.bgMagenta(
      `Connected To Mongodb Database ${mongoose.connection.host}`
    ));
  } catch (error) {
    console.log(colors.bgYellow(`Mognodb Database Error ${error}`));
  }
};

module.exports = connectDB;