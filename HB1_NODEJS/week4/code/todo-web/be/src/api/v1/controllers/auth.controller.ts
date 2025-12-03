import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import Session from "../models/session.model";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, passwordHash, role: "user" }); // Default role user
    await user.save();

    // Create Session
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE);

    await Session.create({
      _id: sessionId,
      userId: user._id,
      role: user.role,
      expiresAt,
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false, // local
      maxAge: SESSION_MAX_AGE,
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create Session
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE);

    await Session.create({
      _id: sessionId,
      userId: user._id,
      role: user.role,
      expiresAt,
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false, // local
      maxAge: SESSION_MAX_AGE,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies?.sessionId;
    if (sessionId) {
      await Session.findByIdAndDelete(sessionId);
    }
    res.clearCookie("sessionId");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
