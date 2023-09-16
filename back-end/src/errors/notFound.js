/**
 * Express API "Not found" handler.
 */
function notFound(req, res, next) {
  next({ status: 444, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
