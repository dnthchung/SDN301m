module.exports = function requestLogger(req, res, next) {
  const start = Date.now();

  const { method, originalUrl } = req;
  const ip = req.ip || req.connection.remoteAddress;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    console.log(`[REQUEST]: ${method} ${originalUrl} - ${statusCode} - ${duration}ms - IP: ${ip}`);
  });

  next();
};
