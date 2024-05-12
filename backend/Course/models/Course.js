const mongoose = require("mongoose");

var Course = mongoose.model("Course", {
  name: { type: String, required: true },
  lec1: { type: String, required: true },
  lec2: { type: String , default: "" },
  lec3: { type: String , default: "" },
  price: { type: Number, required: true},
  video_link: { type: String, required: true},
  quiz_details: { type: String, required: true }
});

module.exports = { Course };
