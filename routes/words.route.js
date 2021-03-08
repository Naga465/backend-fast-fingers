const express = require('express');
const getWord = require('../controllers/words.controller');
const router = express.Router();

router.get('/getword/:game_level',getWord)

module.exports = router
