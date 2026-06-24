const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    status: {
        type: DataTypes.ENUM(
            "todo",
            "in-progress",
            "done"
        ),
        defaultValue: "todo"
    },

    priority: {
        type: DataTypes.ENUM(
            "low",
            "medium",
            "high"
        ),
        defaultValue: "medium"
    },

    dueDate: {
        type: DataTypes.DATE
    },

    estimatedEffort: {
        type: DataTypes.STRING
    }

});

module.exports = Task;