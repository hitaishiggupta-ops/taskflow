const User = require("./User");
const Board = require("./Board");

User.hasMany(Board, {
    foreignKey: "ownerId",
    onDelete: "CASCADE"
});

Board.belongsTo(User, {
    foreignKey: "ownerId"
});

module.exports = {
    User,
    Board
};