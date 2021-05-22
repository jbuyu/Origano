import express from "express";
const Router = express.Router();
import { getProducts, getProductById, updateProduct, createProduct } from "../controllers/productController.js";
import {protect, admin} from '../middleware/authMiddleware.js'
import {deleteProduct} from '../controllers/productController.js'

Router.route("/").get(getProducts).post(protect, admin, createProduct)

Router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default Router;
