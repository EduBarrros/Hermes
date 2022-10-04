const express = require("express");
const router = express.Router()

const {entrar, cadastrar} = require('../controllers/auth')

router.post("/entrar", entrar);
router.post("/cadastrar", cadastrar);

module.exports = router;