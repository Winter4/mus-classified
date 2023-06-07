const { Category } = require("../models");

async function getAll(req, res) {
  let { offset, count } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let categories = await Category.findAll({
    offset: offset,
    limit: count,
  });

  res.status(200).json(categories);
}

async function add(req, res) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name cannot be empty" });

  let cat = await Category.create({
    name: name,
  });

  res.status(200).json(cat);
}

async function remove(req, res) {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });

  let cat = await Category.destroy({
    where: {
      id: id,
    }
  });

  res.status(200);
}

module.exports = {
  getAll,
  add,
  remove,
}