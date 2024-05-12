const express = require('express')
const router = express.Router()

const  { dataGet,dataGetWithID,userId,insertData,editData,deleteData } = require('../controllers/EnrollController')


router.get("/",  dataGet)
router.get("/:id",  dataGetWithID)
router.get("/userId/:id",  userId)
router.post("/", insertData)
router.put("/:id",  editData);
router.delete("/:id",  deleteData);

module.exports = router;