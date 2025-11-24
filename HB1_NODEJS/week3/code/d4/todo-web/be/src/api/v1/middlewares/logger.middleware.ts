import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`ĐÂY LÀ LOG: [${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};
