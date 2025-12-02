"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("~/api/v1/utils/AppError");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    // validate từ Zod
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            errorCode: 4001,
            message: err.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
        });
    }
    // lỗi logic (AppError)
    if (err instanceof AppError_1.AppError) {
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
exports.errorHandler = errorHandler;
