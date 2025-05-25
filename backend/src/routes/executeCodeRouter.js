import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { executeCode } from "../controllers/executeCodeController.js";
const executionRoute = express.Router();

executionRoute.post("/", authMiddleware, executeCode);

export default executionRoute;
