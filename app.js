const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const app = express();

//cors
app.use(cors());

//Regular middlewares
app.use(express.json({ limit: "20kb" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

//importing routes
app.use("/user", userRoute);

module.exports = app;
