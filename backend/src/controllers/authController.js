import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import ImageKit from "imagekit";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Cookie configuration based on environment
const getCookieConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction, // Only secure in production
    sameSite: isProduction ? "none" : "strict", // CRITICAL: "none" for cross-origin in production
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    domain: isProduction ? undefined : undefined, // Let browser handle domain
  };
};

export const upload = multer({ storage: multer.memoryStorage() });

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Use the dynamic cookie config
    res.cookie("jwt", token, getCookieConfig());

    // console.log("Token created:", token);
    // console.log("Cookie config:", getCookieConfig());

    res.status(201).json({
      success: true,
      message: "User Created",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      error: "Error in creating user",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "No user found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Use the dynamic cookie config
    res.cookie("jwt", token, getCookieConfig());

    // console.log("Login token created:", token);
    // console.log("Cookie config:", getCookieConfig());

    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      error: "Error in logging user",
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Use the same cookie config for clearing
    res.clearCookie("jwt", getCookieConfig());

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error in logging out:", error);
    res.status(500).json({
      success: false,
      error: "Error in logging out",
    });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export const update = async (req, res) => {
  let imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLICKEY,
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
  });

  try {
    const userId = req.user.id;
    const { name } = req.body;
    let imageUrl;

    // If image file is uploaded
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      const result = await imagekit.upload({
        file: base64Image,
        fileName: `${Date.now()}.jpg`,
        useUniqueFileName: true,
      });
      imageUrl = result.url;
    }

    // Build update data conditionally
    const updateData = {};
    if (name) updateData.name = name;
    if (imageUrl) updateData.image = imageUrl;

    // If nothing to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided." });
    }

    // Update in database
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name,
        image: imageUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ error: "Failed to update user." });
  }
};
