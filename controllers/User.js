const User = require("../models/User");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.body = user;

    next();
  });
};

exports.getUser = (req, res) => {
  req.body.password = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;
  return res.json(req.body);
};
