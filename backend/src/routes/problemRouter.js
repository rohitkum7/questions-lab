import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblem,
} from "../controllers/problemController.js";

const problemRoutes = express.Router();
problemRoutes.post(
  "/create-problem",
  authMiddleware,
  checkAdmin,
  createProblem
);
problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);
problemRoutes.get("/get-problems/:id", authMiddleware, getProblemById);
problemRoutes.put(
  "/update-problem/:id",
  authMiddleware,
  checkAdmin,
  updateProblem
);

problemRoutes.delete(
  "/delete-problem/:id",
  authMiddleware,
  checkAdmin,
  deleteProblem
);

problemRoutes.get(
  "/get-solved-problems",
  authMiddleware,
  getAllProblemsSolvedByUser
);

export default problemRoutes;
