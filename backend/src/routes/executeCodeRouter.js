import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  //   executeCode,
  runCode,
  submitCode,
} from "../controllers/executeCodeController.js";
const executionRoute = express.Router();

// executionRoute.post("/", authMiddleware, executeCode);
executionRoute.post("/", authMiddleware, runCode);
executionRoute.post("/submit", authMiddleware, submitCode);

export default executionRoute;
