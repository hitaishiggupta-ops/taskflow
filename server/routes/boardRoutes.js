const express = require("express");

const router = express.Router();

const boardController = require("../controllers/boardController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, boardController.createBoard);

router.get("/", protect, boardController.getBoards);

router.put("/:id", protect, boardController.updateBoard);

router.delete("/:id", protect, boardController.deleteBoard);
module.exports = router;