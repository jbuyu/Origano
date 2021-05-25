import express from "express";
const Router = express.Router();
import { getProducts, getProductById, updateProduct, createProduct, createProductReview } from "../controllers/productController.js";
import {protect, admin} from '../middleware/authMiddleware.js'
import {deleteProduct} from '../controllers/productController.js'

Router.route("/").get(getProducts).post(protect, admin, createProduct)

Router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

Router.route('/:id/reviews').post(protect, createProductReview)
export default Router;
