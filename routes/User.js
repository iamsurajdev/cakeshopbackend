const express = require("express");
var router = express.Router();

const { getUserById, getUser, updateUser } = require("../controllers/User");

//Authentication Middleware
const { isLogin } = require("../controllers/Auth");

// Route parameter
router.param("userId", getUserById);

// Routes
router.get("/user/:userId", isLogin, getUser);
router.put("/user/:userId/update", isLogin, updateUser);

module.exports = router;
