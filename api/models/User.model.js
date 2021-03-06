const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: false,
    default: "0",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  accessedReports: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  reports: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
  gender: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    default: "",
    required: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.AddReport = async function (hash) {
  let user = this;
  user.accessedReports.push(hash);
  await user.save();
  return;
};

UserSchema.methods.DeleteReport = async function (hash) {
  const user = this;
  const index = user.accessedReports.indexOf(hash);
  console.log(index);
  // if (index > -1) {
  //   user.accessedReports.splice(index, 1);
  // }
  // await user.save();
  return;
};

UserSchema.methods.MatchPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

UserSchema.methods.GetUserData = async function () {
  const user = this;
  return {
    name: user.name,
    password: user.password,
    email: user.email,
    // age: user.age,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };
};

module.exports = mongoose.model("User", UserSchema);
