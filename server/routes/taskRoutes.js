const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const { taskValidation } = require("../validators/taskValidator");

router.post(
    "/",
    protect,
    taskValidation,
    taskController.createTask
);
router.get("/overdue/all", protect, taskController.getOverdueTasks);
router.get("/task/:id", protect, taskController.getTaskById);
router.get("/search/all", protect, taskController.searchTasks);
router.get("/:boardId", protect, taskController.getTasks);

router.put("/:id", protect, taskController.updateTask);

router.delete("/:id", protect, taskController.deleteTask);

router.patch("/:id/status", protect, taskController.moveTask);
module.exports = router;