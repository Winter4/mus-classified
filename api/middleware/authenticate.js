const { User } = require("../models");
const jwt = require("../helpers/jwt");

module.exports = async (req, res, next) => {
  req.currentUser = null;
  
  const { headers } = req;
  if (!headers.authorization) return next();
  
  const token = headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing or malformed" });

  try {
    let { id } = jwt.verify(token);

    const user = User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ error: "User not found" });
  
    req.currentUser = user;
    next();
  }
  catch {
    return res.status(401).json({ error: "Token missing or malformed" });
  }
}