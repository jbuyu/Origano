import express from "express";
const Router = express.Router();
import products from "../data/products.js";

Router.get("/", (req, res) => {
  res.json({ products });
});
Router.get("/:id", (req, res) => {
  let productId = req.params.id;
  console.log(typeof productId);
  const product = products.find((product) => product._id === productId);
  res.json({ product });
});

export default Router;
