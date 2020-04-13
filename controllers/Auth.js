const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;
  try {
    //isUser exist Validation
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists with this email",
      });
    }

    //start saving to the database
    user = new User({
      name,
      email,
      password,
    });

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //data saved
    await user.save();

    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};
