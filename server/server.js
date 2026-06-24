const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

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