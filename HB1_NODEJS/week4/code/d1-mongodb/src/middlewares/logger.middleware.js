const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[INFO] [${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

export default loggerMiddleware;
