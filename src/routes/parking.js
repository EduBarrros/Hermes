const express = require("express");
const router = express.Router()

const { checkIn, listarCheckIn, checkOut, listarCheckOut, selectCheckIn, selectCheckOut} = require('../controllers/parking')

router.post("/checkIn", checkIn)
router.get("/listarCheckIn", listarCheckIn)
router.get("/listarCheckOut", listarCheckOut)
router.post('/checkOut/:id', checkOut)
router.get('/selectCheckIn/:id', selectCheckIn)
router.get('/selectCheckOut/:id', selectCheckOut)

module.exports = router;