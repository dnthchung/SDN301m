import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string; // Storing as string for convenience
        role: "user" | "admin";
      };
    }
  }
}
