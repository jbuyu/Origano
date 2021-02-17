//dotenv
require("dotenv").config();
//library imports
const express = require("express");
const consola = require("consola");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
//modules imports
const { ProductsRouter } = require("./routes");

//middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route middlewares
app.use("/products", ProductsRouter);

app.listen(PORT, () => {
  consola.success("Server is running on port", PORT);
  consola.success("mongo", process.env.MONGO_URI);
});
