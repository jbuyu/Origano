import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc     Fetch all products
//@route    GET /api/products
//access    Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc     Fetch single product
//@route    GET /api/products/:id
//access    Public

const getProductById = asyncHandler(async (req, res) => {
  let productID = req.params.id;
  const product = await Product.findById(productID);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }

  res.json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  let productID = req.params.id;
  const product = await Product.findById(productID);
  if (product) {
    await product.remove();
    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }

  res.json(products);
});

export { getProductById, getProducts, deleteProduct };
