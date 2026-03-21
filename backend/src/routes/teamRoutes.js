const express = require("express");
const {
  getPlayers,
  createPlayer,
  deletePlayer,
} = require("../controllers/playerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getPlayers);
router.post("/", authMiddleware, createPlayer);
router.delete("/:id", authMiddleware, deletePlayer);

module.exports = router;
