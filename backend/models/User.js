const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;

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
    minlength: 6,
  },
  level: {
    type: Number,
    required: true,
  },
  game1: {
    type: Array,
    required: true,
  },
  game2: {
    type: Array,
    required: true,
  },
  game3: {
    type: Array,
    required: true,
  },
  game4: {
    type: Array,
    required: true,
  },
  game5: {
    type: Array,
    required: true,
  },
  game6: {
    type: Array,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
