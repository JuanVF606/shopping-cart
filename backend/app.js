const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middlewares/erros");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(fileUpload())


// Import ALL Routes
const auth = require("./routes/auth");
const products = require("./routes/products");
const order = require("./routes/order");

app.use("/api/v1/", auth);
app.use("/api/v1/", products);
app.use("/api/v1/", order);

if (process.env.NODE_ENV !== 'PRODUCTION') {
  
require('dotenv').dotenv.config({ path: "backend/config/config.env" });
}

// Middleware to handle error
app.use(errorMiddleware);

module.exports = app;
