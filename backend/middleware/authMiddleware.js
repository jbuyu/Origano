import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import consola from 'consola'

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // let header = req.headers.authorization;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        consola.success('decoded token',decoded)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      consola.error('tken failure',error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
});

export { protect };
