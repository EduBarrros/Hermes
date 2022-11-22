const express = require("express");
const router = express.Router()

const { listUsers, updateUser, disableUser} = require('../controllers/users')

router.get('/list', listUsers)
router.post('/update', updateUser)
router.post('/disable', disableUser)

module.exports = router;