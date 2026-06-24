const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, taskController.createTask);

router.get("/:boardId", protect, taskController.getTasks);

router.put("/:id", protect, taskController.updateTask);

router.delete("/:id", protect, taskController.deleteTask);

router.patch("/:id/status", protect, taskController.moveTask);
module.exports = router;