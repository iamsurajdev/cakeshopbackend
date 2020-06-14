const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var JWT = require("jsonwebtoken");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "surajbiswas",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.SECRETE
  );
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({
    //   errors: errors.array()[0].msg,
    // });
    return res.json({
      error: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;
  try {
    //isUser exist Validation
    let user = await User.findOne({ "local.email": email });
    if (user) {
      // return res.status(400).json({
      //   msg: "User Already Exists with this email",
      // });
      return res.json({
        msg: "User Already Exists with this email",
      });
    }

    //start saving to the database
    user = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
      name: name,
    });

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    user.local.password = await bcrypt.hash(password, salt);

    //data saved
    await user.save();

    const token = signToken(user);

    res.json({
      name: user.name,
      email: user.local.email,
      id: user._id,
      token: token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return res.status(400).json({
    //   errors: errors.array()[0].msg,
    // });
    return res.json({
      error: errors.array()[0].msg,
    });
  }
  //  destructor the email and password
  const { email, password } = req.body;

  // find user in DB
  try {
    let user = await User.findOne({
      "local.email": email,
    });

    // if user not found
    if (!user) {
      // return res.status(400).json({
      //   msg: "User Not Exist",
      // });
      return res.json({
        msg: "User Not Exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.local.password);
    if (!isMatch) {
      // return res.status(400).json({
      //   msg: "Incorrect Password !",
      // });
      return res.json({
        msg: "Incorrect Password !",
      });
    }
    const token = signToken(user);

    res.json({
      name: user.name,
      email: user.local.email,
      id: user._id,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.googleLogin = async (req, res, next) => {
  // Generate token
  console.log("got here");
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.facebookLogin = async (req, res, next) => {
  // Generate token
  console.log("got here");
  const token = signToken(req.user);
  user = req.user;
  res.status(200).json({
    name: user.name,
    email: user.local.email,
    id: user._id,
    role: user.role,
    token: token,
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Logout successfully.",
  });
};

//Custom middleware

// Admin check
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0 || req.user.role === null) {
    return res.status(403).json({
      error: "You are not Admin, ACCESS DENIED",
    });
  }
  next();
};
