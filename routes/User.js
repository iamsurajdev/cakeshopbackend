const express = require("express");
var router = express.Router();

const { getUserById, getUser } = require("../controllers/User");

//Authentication Middleware
const { isLogin } = require("../controllers/Auth");

// Route parameter
router.param("userId", getUserById);

// Routes
router.get("/user/:userId", isLogin, getUser);

module.exports = router;
