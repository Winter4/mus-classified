const { Manufacturer } = require("../models");

async function getAll(req, res) {
  let { offset, count } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let mans = await Manufacturer.findAll({
    offset: offset,
    limit: count,
  });

  res.status(200).json(mans);
}

async function add(req, res) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name cannot be empty" });

  let man = await Manufacturer.create({
    name: name,
  });

  res.status(200).json(man);
}

async function remove(req, res) {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });

  let man = await Manufacturer.destroy({
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