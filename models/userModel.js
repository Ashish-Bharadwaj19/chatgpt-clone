const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie"); // Import the cookie library

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password length should be 6 characters long"],
  },
  customerId: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
  );
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN }
  );
  
  // Set cookies
  const cookieOptions = {
    maxAge: 86400 * 7000, // Adjust as needed
    httpOnly: true,
  };
  res.setHeader("Set-Cookie", cookie.serialize("accessToken", accessToken, cookieOptions));
  res.setHeader("Set-Cookie", cookie.serialize("refreshToken", refreshToken, cookieOptions));
};

const User = mongoose.model("User", userSchema);

module.exports = User;
