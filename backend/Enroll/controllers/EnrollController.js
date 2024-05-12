var ObjectID = require('mongoose').Types.ObjectId
var { Enroll } = require('../models/Enroll')

exports.dataGet = async (req, res) => {
    Enroll.find((err, docs) => {
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

    Enroll.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log(JSON.stringify(err, undefined, 2))
        }
    })
}

exports.userId = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(800).send(req.params.id)
    }

    await Enroll.aggregate([
        { "$addFields": { "courseid": { "$toObjectId": "$course_id" }}},
        { "$addFields": { "user": { "$toObjectId": "$user_id" }}},
        { "$lookup": {
            "from": "courses",
            "localField": "courseid",
            "foreignField": "_id",
            "as": "course_details"
        }},
        { $unwind : "$course_details" },
        {$match:{ 'user' :ObjectID(req.params.id)}}
    ]).then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.send(error);
      });
}

exports.insertData = async (req, res) => {
    let enrollFound = await Enroll.findOne({ course_id: req.body.course_id, user_id: req.body.user_id });
    if (enrollFound) {
        res.status(200).send({ "data": "error" })
    } else {
        var newRecord = new Enroll({
            course_id: req.body.course_id,
            user_id: req.body.user_id
        })

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
        user_id: req.body.user_id
    }

    Enroll.findByIdAndUpdate(req.params.id, { $set: updateRecords }, { new: true }, (err, docs) => {
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

    Enroll.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
}