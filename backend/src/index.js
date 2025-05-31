import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRouter.js";
import problemRoutes from "./routes/problemRouter.js";
import executionRoute from "./routes/executeCodeRouter.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.ORIGIN_ACCESS_URL,
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin:
      process.env.ORIGIN_ACCESS_URL &&
      process.env.ORIGIN_ACCESS_URL.split(",").map((url) => url.trim()),
    credentials: true,
  })
);

console.log(process.env.ORIGIN_ACCESS_URL);

app.get("/", (req, res) => {
  res.send("Hello Guys how are you?");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}...`);
});
