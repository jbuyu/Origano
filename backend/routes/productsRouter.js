import express from "express";
const Router = express.Router();
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc     Fetch all Products
//@route    GET /api/products
//@access   Public
Router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // throw new Error("Product not Found");
    res.json(products);
  })
);

//@desc     Fetch single Product
//@route    GET /api/products/:id
//@access   Public
Router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    let productID = req.params.id;
    const product = await Product.findById(productID);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

export default Router;
