const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");

const { isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const isLogin = passport.authenticate("jwt", { session: false });

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
  "/order/create/:userId",
  isLogin,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read
router.get("/order/all/:userId", isLogin, isAdmin, getAllOrders);

// status of order
router.get("/order/status/:userId", isLogin, isAdmin, getOrderStatus);
router.get("/order/:orderId/status/:userId", isLogin, isAdmin, updateStatus);

module.exports = router;
