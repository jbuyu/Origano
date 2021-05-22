import express from "express";
const Router = express.Router();
import { getProducts, getProductById } from "../controllers/productController.js";
import {protect, admin} from '../middleware/authMiddleware.js'
import {deleteProduct} from '../controllers/productController.js'

Router.route("/").get(getProducts);

Router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct)

export default Router;
