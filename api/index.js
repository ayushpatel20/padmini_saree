const app = require('../backend/server');

module.exports = (req, res) => {
  // Pass control to the Express app
  return app(req, res);
};
