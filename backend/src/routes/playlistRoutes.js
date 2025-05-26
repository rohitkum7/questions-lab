import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getPlaylistDetails,
  removeProblemFromPlaylist,
} from "../controllers/playlistController.js";

const playlistRoutes = express.Router();

playlistRoutes.get("/", authMiddleware, getAllListDetails);

playlistRoutes.get("/:playlistId", authMiddleware, getPlaylistDetails);

playlistRoutes.post("/create-playlist", authMiddleware, createPlaylist);

playlistRoutes.post(
  "/:playlistId/addProblem",
  authMiddleware,
  addProblemToPlaylist
);

playlistRoutes.delete("/:playlistId", authMiddleware, deletePlaylist);

playlistRoutes.delete(
  "/:playlistId/remove-problem",
  authMiddleware,
  removeProblemFromPlaylist
);

export default playlistRoutes;
