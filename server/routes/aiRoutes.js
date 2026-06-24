const express = require("express");

const router = express.Router();

const { protect } =
require("../middleware/authMiddleware");

const aiController =
require("../controllers/aiController");

router.post(
    "/suggest",
    protect,
    aiController.suggestEstimate
);

module.exports = router;