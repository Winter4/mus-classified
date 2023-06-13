const userRoles = require("../helpers/userRoles");

module.exports = (req, res, next) => {
  if (req.currentUser.role == userRoles.EXPERT) return next();
  else return res.status(401).json();
}