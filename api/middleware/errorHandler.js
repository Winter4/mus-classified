module.exports = (error, req, res, next) => {
  res.status(500).json({ error: 500 });
  console.error(error);
}