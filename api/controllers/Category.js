const { Category } = require("../models");

async function getAll(req, res) {
  let categories = await Category.findAll({});

  res.status(200).json(categories);
}

async function get(req, res) {
  let { id } = req.query;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });

  let cat = await Category.findOne({
    where: { id },
  });

  if (!cat) return res.status(404).json({ error: "Incorrect id" });

  res.status(200).json(cat);
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
  get,
  add,
  remove,
}