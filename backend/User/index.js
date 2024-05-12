require("./db")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
var UserRoutes = require("./routes/User")

var app = express()
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))
app.listen(8001, '0.0.0.0' ,() => console.log("Server prot Number : 8001"))

app.use("/User", UserRoutes)
