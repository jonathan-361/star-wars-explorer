const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Error interno del servidor. Intenta más tarde."
        : err.message,
  });
};

module.exports = errorHandler;
