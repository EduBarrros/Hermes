const express = require("express");
const router = express.Router()

const { checkIn, listarCheckIn, checkOut } = require('../controllers/parking')

router.post("/checkIn", checkIn)
router.get("/listarCheckIn", listarCheckIn)
router.post('/checkOut/:id', checkOut)

module.exports = router;