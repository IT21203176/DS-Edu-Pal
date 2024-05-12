const express = require('express')
const router = express.Router()

const  { dataGet,dataGetWithID,insertData,editData,deleteData , statusData} = require('../controllers/LearnerController')


router.get("/",  dataGet)
router.get("/:id",  dataGetWithID)
router.get("/status/:id/:user",  statusData)
router.post("/",  insertData)
router.put("/:id",  editData);
router.delete("/:id",  deleteData);

module.exports = router;