const errorHandler = (err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        success: false,

        message: err.message || "Server Error"

    });
    app.use("*", (req, res) => {

    res.status(404).json({

        message: "Route not found"

    });

});

};

module.exports = errorHandler;