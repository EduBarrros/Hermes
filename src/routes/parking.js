const express = require("express");
const router = express.Router()

const { checkIn, listarCheckIn, checkOut, listarCheckOut } = require('../controllers/parking')

router.post("/checkIn", checkIn)
router.get("/listarCheckIn", listarCheckIn)
router.get("/listarCheckOut", listarCheckOut)
router.post('/checkOut/:id', checkOut)

module.exports = router;