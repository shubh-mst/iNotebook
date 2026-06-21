const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// we have created this schema and now we have to use this schema as a model which is as below and so
// 1st arguement is user and and 2nd arguement is its name of the schema
const User = mongoose.model("user", UserSchema);
module.exports = User;
