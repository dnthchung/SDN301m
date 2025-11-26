import { Request, Response, NextFunction } from "express";
import { AppError } from "~/api/v1/utils/AppError";
import { ZodError } from "zod";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  // validate từ Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errorCode: 4001,
      message: err.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
    });
  }

  // lỗi logic (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
    });
  }

  // lỗi server không xác định
  return res.status(500).json({
    success: false,
    errorCode: 5000,
    message: "Internal Server Error",
  });
};
