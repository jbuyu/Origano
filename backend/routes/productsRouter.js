import express from "express";
const Router = express.Router();
import { getProducts, getProductById } from "../controllers/productController.js";

Router.route("/").get(getProducts);

Router.route("/:id").get(getProductById)

export default Router;
