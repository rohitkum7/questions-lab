import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllSubmission,
  getAllTheSubmissionsForProblem,
  getSubmissionForProblem,
} from "../controllers/submissionController.js";
const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmission);
submissionRoutes.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionForProblem
);

submissionRoutes.get(
  "/get-submission-count/:problemId",
  authMiddleware,
  getAllTheSubmissionsForProblem
);

export default submissionRoutes;
