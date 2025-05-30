// import bycrpt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { db } from "../libs/db.js";
// import { UserRole } from "../generated/prisma/index.js";

// export const register = async (req, res) => {
//   const { email, password, name } = req.body;
//   try {
//     const existingUser = await db.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         error: "User already exists",
//       });
//     }

//     const hashedPassword = await bycrpt.hash(password, 10);

//     const newUser = await db.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name,
//         role: UserRole.USER,
//       },
//     });

//     const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       sameSite: "Strict",
//       secure: process.env.NODE_ENV !== "development",
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     });

//     console.log(token);

//     res.status(201).json({
//       success: true,
//       message: "User Created",
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         name: newUser.name,
//         role: newUser.role,
//         image: newUser.image,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating user ", error);
//     res.status(500).json({
//       success: false,
//       error: "Error in creating user",
//     });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = bycrpt.hash(password, 10);
//     const user = await db.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (!user) {
//       res.status(401).json({ error: "No user found" });
//     }

//     const isMatch = await bycrpt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(401).json({ success: false, error: "Invalid Credentials" });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV !== "development",
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     });
//     res.status(200).json({
//       success: true,
//       message: "User Logged in successfully",
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//         image: user.image,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating user ", error);
//     res.status(500).json({
//       success: false,
//       error: "Error in logging user",
//     });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("jwt", {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: process.env.NODE_ENV !== "development",
//     });

//     res.status(200).json({
//       success: true,
//       message: "User logged out successfully",
//     });
//   } catch (error) {
//     console.error("Error in logging out ", error);
//     res.status(500).json({
//       success: false,
//       error: "Error in logging out",
//     });
//   }
// };

// export const check = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       message: "User authenticated successfully",
//       user: req.user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";

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

    console.log("Token created:", token);
    console.log("Cookie config:", getCookieConfig());

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

    console.log("Login token created:", token);
    console.log("Cookie config:", getCookieConfig());

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
