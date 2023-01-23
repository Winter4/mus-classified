module.exports = async (req, res, next) => {
  if (req.currentUser) return next();
  else return res.status(401);
}