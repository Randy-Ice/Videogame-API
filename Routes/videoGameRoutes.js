const express = require("express");
const router = express.Router();
const { getGames, getGameById } = require("../Controllers/videoGameController");

router.get("/", getGames);
router.get("/:id", getGameById);

module.exports = router;
