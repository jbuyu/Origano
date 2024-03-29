//dotenv
import dotenv from "dotenv";
dotenv.config();
//library imports
import path from "path";
import express from "express";
import consola from "consola";
const PORT = process.env.PORT || 4000;
import cors from "cors";
import morgan from "morgan";
// import bodyParser from "body-parser";
const app = express();

// if(process.env.NODE_ENV === 'development'){
app.use(morgan("dev"));
// }
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

//db
import connectDB from "./config/db.js";
//modules imports
import productsRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//route middlewares
app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// } else {
  // }
  app.get("/", (req, res) => {
    res.send("API is running");
  });

//error middlewares
app.use(notFound);
app.use(errorHandler);

//db
connectDB();

app.listen(PORT, () => {
  consola.success("Server is running on port", PORT);
});
