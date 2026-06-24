const { body } = require("express-validator");

exports.taskValidation = [

    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Priority must be low, medium, or high"),

    body("status")
        .optional()
        .isIn(["todo", "in-progress", "done"])
        .withMessage("Invalid status")

];