const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  _id: { type: String, required: true },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = Mongoose.model("User", UserSchema);

module.exports = User;
