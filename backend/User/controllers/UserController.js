var ObjectID = require("mongoose").Types.ObjectId;
var md5 = require("md5");
var { User } = require("../models/User");
const nodemailer = require("nodemailer");

exports.dataGet = async (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(JSON.stringify(err, undefined, 2));
        }
    });
};

exports.dataGetWithID = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(800).send(req.params.id);
    }

    User.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(JSON.stringify(err, undefined, 2));
        }
    });
};

exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userFound = await User.findOne({ email: email });
    if (userFound) {
        if (md5(password) == userFound.password) {
            if (userFound.access) {
                if (userFound.privilege == "admin") {
                    res.send(
                        JSON.stringify({
                            res: "admin",
                            email: userFound.email,
                            id: userFound._id,
                        })
                    );
                } else if (userFound.privilege == "instructor") {
                    res.send(
                        JSON.stringify({
                            res: "instructor",
                            email: userFound.email,
                            id: userFound._id,
                        })
                    );
                } else {
                    res.send(
                        JSON.stringify({
                            res: "student",
                            email: userFound.email,
                            id: userFound._id,
                        })
                    );
                }
            } else {
                res.status(200).send(JSON.stringify({ err: "Access Deny!" }));
            }
        } else {
            res.status(200).send(JSON.stringify({ err: "Incorrect Password" }));
        }
    } else {
        res.status(200).send(JSON.stringify({ err: "User not found" }));
    }
};

exports.newData = async (req, res) => {
    var newRecord = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: md5(req.body.password),
        access: false,
        privilege: "student",
    });

    newRecord.save((err, docs) => {
        if (!err) {
            console.log(docs);
            send_email(req.body.email, "", "")
            res.status(200).send({ data: "success" });
        } else {
            console.log(err);
            if (err["keyPattern"]["email"] == 1) {
                console.log(err["keyPattern"]["email"]);
                res.status(200).send({ err: "email" });
            } else {
                res.status(err);
            }
        }
    });
};

exports.editData = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(800).send(req.params.id);
    }

    var updateRecords = {
        privilege: req.body.privilege,
        access: req.body.access,
    };

    User.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecords },
        { new: true },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log(JSON.stringify(err, undefined, 2));
            }
        }
    );
};

exports.deleteData = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(800).send(req.params.id);
    }

    User.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            send_email(req.body.email, "", "")
            res.send(docs);
        } else {
            res.send(err);
        }
    });
};

function send_email(email_address, subject, text) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'apptest1994.05@gmail.com',
            pass: 'spycuujxfuqlypuz'
        }
    });

    var mailOption = {
        from: "apptest1994.05@gmail.com",
        to: email_address,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            console.log("Message sent: %s", info.response);
            res.send(info.response);
        }
    });
}
