const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
    "mongodb+srv://DSEduApp:DSEduApp2024@dseducationalapp.te9cgfs.mongodb.net/?retryWrites=true&w=majority&appName=DSEducationalApp",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("connection success!");
        } else {
            console.log("connection fail!" + JSON.stringify(err, undefined, 2));
        }
    }
);
