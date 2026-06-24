const Task = require("../models/Task");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
exports.createTask = async (req, res) => {

    try {
        const errors = validationResult(req);

if (!errors.isEmpty()) {

    return res.status(400).json({
        errors: errors.array()
    });

}

        const task = await Task.create({

            title: req.body.title,

            description: req.body.description,

            priority: req.body.priority,

            dueDate: req.body.dueDate,

            boardId: req.body.boardId,

            ownerId: req.user.id

        });

        res.status(201).json(task);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.findAll({

            where: {

    boardId: req.params.boardId,

    ownerId: req.user.id,

    ...(req.query.priority && {
        priority: req.query.priority
    }),

    ...(req.query.status && {
        status: req.query.status
    })

}

        });

        res.status(200).json(tasks);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findOne({
            where: {
                id: req.params.id,
                ownerId: req.user.id
            }
        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        await task.update(req.body);

        res.status(200).json(task);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.deleteTask = async (req, res) => {

    try {

        const task = await Task.findOne({
            where: {
                id: req.params.id,
                ownerId: req.user.id
            }
        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        await task.destroy();

        res.status(200).json({
            message: "Task deleted successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.moveTask = async (req, res) => {

    try {

        const task = await Task.findOne({
            where: {
                id: req.params.id,
                ownerId: req.user.id
            }
        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        task.status = req.body.status;

        await task.save();

        res.status(200).json(task);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getTaskById = async (req, res) => {

    try {

        const task = await Task.findOne({

            where: {
                id: req.params.id,
                ownerId: req.user.id
            }

        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.status(200).json(task);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getOverdueTasks = async (req, res) => {

    try {

        const tasks = await Task.findAll({

            where: {

                ownerId: req.user.id,

                dueDate: {
                    [Op.lt]: new Date()
                },

                status: {
                    [Op.ne]: "done"
                }

            }

        });

        res.status(200).json(tasks);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.searchTasks = async (req, res) => {

    try {

        const keyword = req.query.keyword;

        const tasks = await Task.findAll({

            where: {

                ownerId: req.user.id,

                title: {
                    [Op.like]: `%${keyword}%`
                }

            }

        });

        res.status(200).json(tasks);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};