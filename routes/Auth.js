var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");

const { register, login, isAdmin, isLogin } = require("../controllers/Auth");

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

// just a testing route
// router.get("/testroute", isLogin, (req, res) => {
//   res.json(req.profile);
// });

module.exports = router;
