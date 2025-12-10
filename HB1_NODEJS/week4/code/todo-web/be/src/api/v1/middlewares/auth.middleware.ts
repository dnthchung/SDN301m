import { Request, Response, NextFunction } from "express";
import Session from "../models/session.model";
import Todo from "../models/todo.model";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies?.sessionId; // cookie-parser needed
    if (!sessionId) {
      return next();
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return next();
    }

    if (new Date() > session.expiresAt) {
      await Session.findByIdAndDelete(sessionId);
      return next();
    }

    req.user = {
      userId: session.userId.toString(),
      role: session.role as "user" | "admin",
    };

    next();
  } catch (error) {
    console.error("Deserialize User Error:", error);
    next();
  }
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const requireRole = (role: "user" | "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export const checkTodoOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.id;
  const user = req.user;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (user.role === "admin") {
      return next();
    }

    if (todo.ownerId.toString() !== user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
