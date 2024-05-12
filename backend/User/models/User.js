const mongoose = require("mongoose");

var User = mongoose.model("User", {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  privilege: {
    type: String,
    enum: ["admin", "instructor","student"],
    required: true,
  },
  phone: { type: String, required: true},
  access: { type: Boolean, required: true },
  password: { type: String, required: true }
});

module.exports = { User };
