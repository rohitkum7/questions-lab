import express from "express";
const authRoutes = express.Router();

import {
  check,
  login,
  logout,
  register,
  update,
  upload,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/check", authMiddleware, check);
authRoutes.patch("/update", authMiddleware, upload.single("image"), update);

export default authRoutes;
