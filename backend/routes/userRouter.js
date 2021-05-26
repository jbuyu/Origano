import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  authUser,
  getUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";

router.route("/").get(protect, admin, getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/login", authUser);
router.post("/register", registerUser);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);


export default router;
