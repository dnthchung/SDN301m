export class AppError extends Error {
  public statusCode: number;
  public errorCode: number;

  constructor(statusCode: number, errorCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
