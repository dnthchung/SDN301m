module.exports = function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || statusCode;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    errorCode,
    message,
  });
};
