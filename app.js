// in this file everything should be in the same order...!

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//import routes
const authRoutes = require("./routes/Auth");
const userRoutes = require("./routes/User");
const categoryRoutes = require("./routes/Category");
const productRoutes = require("./routes/Product");

// environment variable
require("dotenv").config();

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// middle wares
// middle wares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// Port
const port = process.env.PORT || 8000;

//  Starting SERVER
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
