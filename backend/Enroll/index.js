require("./db.js")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

var EnrollRoutes = require("./routes/Enroll.js")

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }))
app.listen(8003, '0.0.0.0' ,() => console.log("Server prot Number : 8003"))

app.use("/Enroll", EnrollRoutes)
