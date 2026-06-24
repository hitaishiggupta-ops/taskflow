const User = require("./User");
const Board = require("./Board");
const Task = require("./Task");

User.hasMany(Board, {
    foreignKey: "ownerId",
    onDelete: "CASCADE"
});

Board.belongsTo(User, {
    foreignKey: "ownerId"
});

Board.hasMany(Task, {
    foreignKey: "boardId",
    onDelete: "CASCADE"
});

Task.belongsTo(Board, {
    foreignKey: "boardId"
});

User.hasMany(Task, {
    foreignKey: "ownerId",
    onDelete: "CASCADE"
});

Task.belongsTo(User, {
    foreignKey: "ownerId"
});

module.exports = {
    User,
    Board,
    Task
};