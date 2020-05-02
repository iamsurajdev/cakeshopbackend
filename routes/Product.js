const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/Product");

const { isAdmin } = require("../controllers/Auth");
const { getUserById } = require("../controllers/User");
const isLogin = passport.authenticate("jwt", { session: false });

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

// all of actual routes

// create route
router.post("/product/create/:userId", isLogin, isAdmin, createProduct);

// read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo); //this is for optimization

// delete route
router.delete("/product/:productId/:userId", isLogin, isAdmin, deleteProduct);

// update route
router.put("/product/:productId/:userId", isLogin, isAdmin, updateProduct);

// listing route
router.get("/products/", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
