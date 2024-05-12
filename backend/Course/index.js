require("./db.js")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

var CourseRoutes = require("./routes/Course.js")

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }))
app.listen(8004, '0.0.0.0' , () => console.log("Server prot Number : 8004"))

app.use("/Course", CourseRoutes)

app.use(express.static("public"))
