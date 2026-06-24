const Task = require("../models/Task");

exports.getStats = async (req, res) => {

    try {

        const tasks = await Task.findAll({
            where: {
                ownerId: req.user.id
            }
        });

        const stats = {

            totalTasks: tasks.length,

            todo: tasks.filter(
                task => task.status === "todo"
            ).length,

            inProgress: tasks.filter(
                task => task.status === "in-progress"
            ).length,

            done: tasks.filter(
                task => task.status === "done"
            ).length,

            highPriority: tasks.filter(
                task => task.priority === "high"
            ).length,

            overdue: tasks.filter(

task =>

task.dueDate &&
new Date(task.dueDate) < new Date() &&
task.status !== "done"

).length
        };

        res.json(stats);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};