const express = require("express");
const router = express.Router()
const {entrar, cadastrar} = require('../controllers/auth')

router.get("/entrar", entrar);

router.post("/cadastrar", cadastrar);

module.exports = router;