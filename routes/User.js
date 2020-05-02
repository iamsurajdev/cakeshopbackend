const express = require("express");
var router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");

const { getUserById, getUser, updateUser } = require("../controllers/User");

//Authentication Middleware
const isLogin = passport.authenticate("jwt", { session: false });

// Route parameter
router.param("userId", getUserById);

// Routes
router.get("/user/:userId", isLogin, getUser);
router.put("/user/:userId/update", isLogin, updateUser);

module.exports = router;
