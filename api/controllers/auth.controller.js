import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d";

// Register (common for both roles)
export const register = async (req, res) => {
  try {
    const { name, email, password, role, shopName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const model = role === "seller" ? prisma.seller : prisma.customer;

    const existingUser = await model.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await model.create({
      data: { name, email, shopName, password: hashedPassword },
    });

    res.status(201).json({ message: `${role} registered`, userId: newUser.id });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password and role are required." });
    }

    const model = role === "seller" ? prisma.seller : prisma.customer;

    const user = await model.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check if user is admin
    let finalRole = role;
    if (user.admin) {
      finalRole = "admin";
    }

    const token = jwt.sign({ userId: user.id, role: finalRole }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Send token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
    });

    // Add finalRole to the user object
    const userWithRole = { ...user, role: finalRole };

    res
      .status(200)
      .json({ message: "Login successful", token, user: userWithRole });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

