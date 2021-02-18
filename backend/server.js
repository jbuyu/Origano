//dotenv
import dotenv from "dotenv";
dotenv.config();
//library imports
import express from "express";
import consola from "consola";
const PORT = process.env.PORT || 4000;
import cors from "cors";
import bodyParser from "body-parser";
import products from "./data/products.js";
const app = express();
//modules imports
// import { getProduct, getProducts } from "./routes/ProductsRouter.js";

//middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route middlewares
// app.use("/api/products", getProducts);
// app.use("/api/products/:id", getProduct);

app.get("/api/products", (req, res) => {
  res.json({ products });
});

app.get("/api/products/:id", (req, res) => {
  let productId = req.params.id;
  console.log(typeof productId);
  const product = products.find((product) => product._id === productId);
  res.json({ product });
});

app.listen(PORT, () => {
  consola.success("Server is running on port", PORT);
  consola.success("Server is running on port", process.env.NODE_ENV);
});
