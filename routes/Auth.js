var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { register } = require("../controllers/Auth");

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

module.exports = router;
