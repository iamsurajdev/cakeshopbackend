const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/Category");
const { isAdmin } = require("../controllers/Auth");
const { getUserById } = require("../controllers/User");
const isLogin = passport.authenticate("jwt", { session: false });

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// actual routes goes here
//create routes
router.post("/category/create/:userId", isLogin, isAdmin, createCategory);

//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update route
router.put("/category/:categoryId/:userId", isLogin, isAdmin, updateCategory);

//delete route
router.delete(
  "/category/:categoryId/:userId",
  isLogin,
  isAdmin,
  removeCategory
);

module.exports = router;
