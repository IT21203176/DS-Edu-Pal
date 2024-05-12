const express = require('express')
const router = express.Router()

const  { dataGet,dataGetWithID,newData,editData,deleteData , uploadFile } = require('../controllers/CourseController')


router.get("/",  dataGet)
router.get("/:id",  dataGetWithID)
router.post("/",  newData)
router.put("/:id",  editData)
router.delete("/:id",  deleteData)
router.post("/upload",  uploadFile)

module.exports = router;