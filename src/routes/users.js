const express = require("express");
const router = express.Router()

const { listUsers, updateUser} = require('../controllers/users')

router.get('/list', listUsers)
router.post('/update', updateUser)

module.exports = router;