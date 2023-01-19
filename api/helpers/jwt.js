const jwt = require("jsonwebtoken");

function sign(userId) {
  return jwt.sign(
    { id: userId, iat: Math.floor(Date.now() / 1000) - 30 }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' }
  );
}

function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  sign,
  verify
}