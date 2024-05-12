require("./db.js")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }))
app.listen(8002, '0.0.0.0' , () => console.log("Server prot Number : 8002"))

var LearnerRoutes = require("./routes/Learner.js")
app.use("/Learner", LearnerRoutes)
