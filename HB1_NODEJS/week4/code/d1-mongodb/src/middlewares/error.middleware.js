import { ZodError } from "zod";

const errorMiddleware = (err, req, res, next) => {
  // Mặc định là lỗi Server 500
  let statusCode = 500;
  let errorCode = 500;
  let message = "Internal Server Error";

  // Log lỗi ra terminal để debug xem cấu trúc lỗi thực tế là gì
  console.error("[ERROR-Middleware] Error Details:", err);

  // 1. Xử lý lỗi từ Zod (Validation)
  if (err instanceof ZodError) {
    statusCode = 400;
    errorCode = 400;

    // fix Ở ĐÂY: Dùng optional chaining (?.) và fallback mảng rỗng []
    // Để đảm bảo không bao giờ bị crash nếu errors không tồn tại
    const issues = err.errors || [];
    message = issues.length > 0 ? issues.map((e) => e.message).join(", ") : "Validation error occurred";
  }
  // 2. Xử lý lỗi CastError của MongoDB (ID sai format)
  else if (err.name === "CastError") {
    statusCode = 404;
    errorCode = 404;
    message = "Resource not found. Invalid ID format.";
  }
  // 3. Xử lý lỗi duplicate key (MongoDB)
  else if (err.code === 11000) {
    statusCode = 409; // Conflict
    errorCode = 409;
    message = "Duplicate field value entered (Dữ liệu đã tồn tại)";
  }
  // 4. Các lỗi custom có gán status
  else if (err.statusCode) {
    statusCode = err.statusCode;
    errorCode = err.errorCode || statusCode;
    message = err.message;
  }
  // 5. Nếu không phải các lỗi trên -> Lỗi code hoặc thư viện khác
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    errorCode: errorCode,
    message: message,
  });
};

export default errorMiddleware;
