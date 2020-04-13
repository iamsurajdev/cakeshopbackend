var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");

const { register, login } = require("../controllers/Auth");

// Register route
router.post(
  "/register",
  [
    check("name", "Please Enter a Valid name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  register
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  login
);

module.exports = router;
