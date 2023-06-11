const { Category } = require("../models");

async function getAll(req, res) {
  let categories = await Category.findAll({});

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

  res.status(200).json();
}

module.exports = {
  getAll,
  add,
  remove,
}