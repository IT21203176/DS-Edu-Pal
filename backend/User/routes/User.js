const express = require('express')

const  { dataGet,dataGetWithID,login,newData,editData,deleteData } = require('../controllers/UserController')

const router = express.Router()

router.get("/", dataGet)
router.get("/:id", dataGetWithID)
router.post("/", newData)
router.put("/:id", editData)
router.delete("/:id", deleteData)
router.post("/login", login)

module.exports = router;