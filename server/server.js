const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const errorHandler =
require("./middleware/errorMiddleware");
const aiRoutes =
require("./routes/aiRoutes");

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.get("/health", (req, res) => {

    res.status(200).json({

        status: "OK",

        message: "TaskFlow Backend Running"

    });

});
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/profile", protect, (req, res) => {

    res.json({
        message: "Protected route accessed",
        user: req.user
    });

});

app.get("/", (req, res) => {
    res.send("TaskFlow API Running");
});

const PORT = process.env.PORT || 8000;
require("./models");

app.use(errorHandler);
sequelize.sync()
.then(() => {

    console.log("Database Connected");

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });

})
.catch(err => {
    console.log(err);
});