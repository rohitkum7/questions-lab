import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401),
        json({
          success: false,
          message: "Unauthorised - No Token Provided",
        });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in authenticating",
    });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ success: false, message: "You dont have permission!" });
    }

    next();
  } catch (error) {
    console.error("Error in checking role", error);
    res
      .status(500)
      .json({ success: false, message: "Error checking Admin role" });
  }
};
