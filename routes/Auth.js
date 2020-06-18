var express = require("express");
var router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");

const { check, validationResult } = require("express-validator");

const {
  register,
  isAdmin,
  login,
  logout,
  googleLogin,
  facebookLogin,
} = require("../controllers/Auth");

const isLogin = passport.authenticate("jwt", { session: false });
const googleToken = passport.authenticate("googleToken", { session: false });
const facebookToken = passport.authenticate("facebookToken", {
  session: false,
});

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

router.post("/oauth/google", googleToken, googleLogin);

router.post("/oauth/facebook", facebookToken, facebookLogin);

router.get("/logout", logout);

// just a testing route
router.get("/testroute", isLogin, isAdmin, (req, res) => {
  res.json("Tera baap hu mader chood");
});

module.exports = router;
