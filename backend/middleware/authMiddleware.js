/**
 * authMiddleware.js
 * Re-exports the protect middleware from auth.js
 * Matches the naming convention in the project spec.
 */
const { protect } = require('./auth');

module.exports = { protect };
