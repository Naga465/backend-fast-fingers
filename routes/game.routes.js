const express = require("express");
const gameController = require("../controllers/game.controller");
const verifyToken = require("../verifyToken");
const router = express.Router();
router.get('/get-history',verifyToken, gameController.getGameHistory);
router.post('/update',verifyToken,gameController.updateGameHistory)

module.exports =  router
