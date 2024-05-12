var ObjectID = require('mongoose').Types.ObjectId
var { Learner } = require('../models/Learner')

exports.dataGet = async (req, res) => {
    Learner.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
}

exports.dataGetWithID = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(800).send(req.params.id)
    }

    Learner.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
}

exports.statusData = async (req, res) => {
    console.log(req.params.id)
    console.log(req.params.user)

    Learner.findOne({course_id:req.params.id,user_id:req.params.user}, (err, docs) => {
        if (!err) {
            console.log(docs)
            res.send(docs)
        } else {
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
}

exports.insertData = async (req, res) => {
    let lFound = await Learner.findOne({ course_id: req.body.course_id, user_id: req.body.user_id });
    if (lFound) {
        if (req.body.lec1 == true) {
            var updateRecords = {
                course_id: req.body.course_id,
                user_id: req.body.user_id,
                lec1: req.body.lec1
            }
        } else if (req.body.lec2 == true) {
            var updateRecords = {
                course_id: req.body.course_id,
                user_id: req.body.user_id,
                lec2: req.body.lec2
            }
        } else {
            var updateRecords = {
                course_id: req.body.course_id,
                user_id: req.body.user_id,
                lec3: req.body.lec3
            }
        }
        Learner.findByIdAndUpdate(lFound._id, { $set: updateRecords }, { new: true }, async(err, docs) => {
            if (!err) {
                let lFound1 = await Learner.findOne({ course_id: req.body.course_id, user_id: req.body.user_id });
                if (lFound1) {
                    if(lFound1.lec1==true&&lFound1.lec2==true&&lFound1.lec3==true){
                        let eFound = await Learner.findOne({ course_id: req.body.course_id, user_id: req.body.user_id });
                        var updateRecords = {
                            status: "completed"
                        }
                    
                        Learner.findByIdAndUpdate(eFound._id, { $set: updateRecords }, { new: true }, (err, docs) => {
                            if (!err) {
                                res.send(docs)
                            } else {
                                console.log(JSON.stringify(err, undefined, 2))
                            }
                        })
                    }
                }
                } else {
                    console.log(JSON.stringify(err, undefined, 2))
                }
            })
    } else {
        if (req.body.lec1 == true) {
            var newRecord = new Learner({
                course_id: req.body.course_id,
                user_id: req.body.user_id,
                lec1: req.body.lec1,
                status:"inprogress"
            })
        } else if (req.body.lec2 == true) {
            var newRecord = new Learner({
                course_id: req.body.course_id,
                user_id: req.body.user_id,
                lec2: req.body.lec2,
                status:"inprogress"
            })
        } else if (req.body.lec3 == true) {
            var newRecord = new Learner({
                course_id: req.body.course_id,
                user_id: req.body.user_id,
                lec3: req.body.lec3,
                status:"inprogress"
            })
        }

        newRecord.save((err, docs) => {
            if (!err) {
                console.log(docs)
                res.status(200).send({ "data": "success" })
            } else {
                res.status(err)
            }
        })
    }
}

exports.editData = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(800).send(req.params.id)
    }

    var updateRecords = {
        course_id: req.body.course_id,
        user_id: req.body.user_id,
        lec1: req.body.lec1,
        lec2: req.body.lec2,
        lec3: req.body.lec3,
        note4: req.body.note4,
        note5: req.body.note5
    }

    Learner.findByIdAndUpdate(lFound._id.toHexString(), { $set: updateRecords }, { new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
}

exports.deleteData = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(800).send(req.params.id)
    }

    Learner.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
}