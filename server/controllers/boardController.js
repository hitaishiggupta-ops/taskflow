const Board = require("../models/Board");

exports.createBoard = async (req, res) => {

    try {

        const board = await Board.create({

            title: req.body.title,
            description: req.body.description,
            ownerId: req.user.id

        });

        res.status(201).json(board);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getBoards = async (req, res) => {

    try {

        const boards = await Board.findAll({

            where: {
                ownerId: req.user.id
            }

        });

        res.status(200).json(boards);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.updateBoard = async (req, res) => {

    try {

        const board = await Board.findOne({
            where: {
                id: req.params.id,
                ownerId: req.user.id
            }
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        await board.update(req.body);

        res.status(200).json(board);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.deleteBoard = async (req, res) => {

    try {

        const board = await Board.findOne({
            where: {
                id: req.params.id,
                ownerId: req.user.id
            }
        });

        if (!board) {

            return res.status(404).json({
                message: "Board not found"
            });

        }

        await board.destroy();

        res.status(200).json({
            message: "Board deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};