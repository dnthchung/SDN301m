"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequest = exports.InternalServerError = exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.ErrorResponse = exports.SuccessResponse = void 0;
const messages_constant_1 = require("~/api/v1/constants/messages.constant");
const winston_log_1 = require("~/api/v1/logger/winston.log");
// ==================== SUCCESS RESPONSE ====================
class SuccessResponse {
    response;
    constructor(message = 'success', statusCode = 200, data, metadata) {
        this.response = {
            status: 'success',
            statusCode,
            message,
            data,
            metadata: {
                timestamp: new Date().toISOString(),
                ...metadata
            }
        };
    }
    // Static factory methods for common success responses
    static ok(data, message = 'Success') {
        return new SuccessResponse(message, 200, data);
    }
    static created(data, message = 'Resource created successfully') {
        return new SuccessResponse(message, 201, data);
    }
    // Method to get response object
    getResponse() {
        return this.response;
    }
    // Method to send response via Express Response object
    send(res) {
        res.status(this.response.statusCode).json(this.response);
    }
}
exports.SuccessResponse = SuccessResponse;
// ==================== ERROR RESPONSE ====================
class ErrorResponse extends Error {
    statusCode;
    errorType;
    isOperational;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details;
    logger = winston_log_1.myLogger;
    constructor(message, statusCode, errorType = 'GENERIC_ERROR', isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.isOperational = isOperational;
        this.logger.error(this.message, {
            context: '/path',
            message: this.message,
            requestId: 'AAAAB111'
        });
    }
}
exports.ErrorResponse = ErrorResponse;
// Specific Error Classes
class BadRequestError extends ErrorResponse {
    constructor(message = messages_constant_1.ErrorMessage.BAD_REQUEST, details) {
        super(message, 400, messages_constant_1.ErrorMessage.BAD_REQUEST);
        this.details = details;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ErrorResponse {
    constructor(message, details) {
        super(message, 401, messages_constant_1.ErrorMessage.UNAUTHORIZED);
        this.details = details;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ErrorResponse {
    constructor(message = 'Forbidden') {
        super(message, 403, 'FORBIDDEN');
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ErrorResponse {
    constructor(message = 'Resource not found') {
        super(message, 404, 'NOT_FOUND');
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ErrorResponse {
    constructor(message = 'Resource conflict', details) {
        super(message, 409, 'CONFLICT');
        this.details = details;
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends ErrorResponse {
    constructor(message = 'Validation failed', details) {
        super(message, 422, 'VALIDATION_ERROR');
        this.details = details;
    }
}
exports.ValidationError = ValidationError;
class InternalServerError extends ErrorResponse {
    constructor(message = 'Internal server error') {
        super(message, 500, 'INTERNAL_SERVER_ERROR');
    }
}
exports.InternalServerError = InternalServerError;
class TooManyRequest extends ErrorResponse {
    constructor(message = 'Too many Request') {
        super(message, 429, 'TOO_MANY_REQUEST');
    }
}
exports.TooManyRequest = TooManyRequest;
