const mongoose = require("mongoose");

var Enroll = mongoose.model("Enroll", {
  course_id: { type: String, required: true },
  user_id: { type: String, required: true }
});

module.exports = { Enroll };
