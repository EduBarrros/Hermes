const express = require("express");
const router = express.Router()

const { listUsers } = require('../controllers/users')

router.get('/list', listUsers)

module.exports = router;