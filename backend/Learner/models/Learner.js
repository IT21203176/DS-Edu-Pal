const mongoose = require("mongoose");

var Learner = mongoose.model("Learner", {
  course_id: { type: String, required: true },
  user_id: { type: String, required: true },
  lec1: { type: Boolean, required: false },
  lec2: { type: Boolean, default: false },
  lec3: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["completed", "inprogress"],
    required: true,
  }
});

module.exports = { Learner };
