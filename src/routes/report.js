const express = require("express");
const router = express.Router()

const { flowReport } = require('../controllers/report')

router.post('/flowReport', flowReport)
module.exports = router;