// in this file everything should be in the same order...!

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//import routes
const authRoutes = require("./routes/Auth");

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
app.use(express.json());

//my routes
app.use("/api", authRoutes);

// Port
const port = process.env.PORT || 8000;

//  Starting SERVER
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
