import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "~/api/v1/utils/response.util";
import { ZodError } from "zod";
import { myLogger } from "~/api/v1/logger/winston.log";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      errorType: err.errorType,
      ...(err.details && {
        details: err.details
      }),
      metaData: {
        timeStamp: new Date().toISOString()
      }
    });
  }

  // validate từ Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: "Validation Error",
      errorType: "VALIDATION_ERROR",
      details: err.issues.map((e) => `${e.path.join(".")}: ${e.message}`),
      metaData: {
        timeStamp: new Date().toISOString()
      }
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: err.message,
      errorType: 'MONGOOSE_VALIDATION_ERROR',
      // @ts-ignore
      details: Object.values(err.errors).map((e: any) => e.message),
      metaData: {
        timeStamp: new Date().toISOString()
      }
    });
  }

  // Mongoose Cast Error (Invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: "Invalid Resource ID",
      errorType: 'CAST_ERROR',
      metaData: {
        timeStamp: new Date().toISOString()
      }
    });
  }

  // Duplicate Key Error
  // @ts-ignore
  if (err.code === 11000) {
    return res.status(409).json({
      status: 'error',
      statusCode: 409,
      message: "Duplicate Key Error",
      errorType: 'DUPLICATE_KEY_ERROR',
      // @ts-ignore
      details: err.keyValue,
      metaData: {
        timeStamp: new Date().toISOString()
      }
    });
  }

  // default error
  console.error("Internal Server Error:", err);
  myLogger.error(err.message, {
    context: req.path,
    requestId: "UNKNOWN", // You might want to generate this in a previous middleware
    message: err.message
  });

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: "Internal Server Error",
    errorType: 'INTERNAL_SERVER_ERROR',
    metaData: {
      timeStamp: new Date().toISOString()
    }
  });
};
