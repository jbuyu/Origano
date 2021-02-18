//dotenv
import dotenv from "dotenv";
dotenv.config();
//library imports
import express from "express";
import consola from "consola";
const PORT = process.env.PORT || 4000;
import cors from "cors";
import bodyParser from "body-parser";

//db
import connectDB from "./config/db.js";
const app = express();
//modules imports
import productsRouter from "./routes/productsRouter.js";

//middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

//route middlewares
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  consola.success("Server is running on port", PORT);
});
