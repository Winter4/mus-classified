const { Manufacturer, InstrumentModel } = require("../models");

async function getAll(req, res) {
  let { offset, count, manufacturerId } = req.query;

  let where = {};
  if (manufacturerId != 0) where.manufacturerId = manufacturerId;

  let mans = await InstrumentModel.findAll({
    where,
    include: [
      {
        model: Manufacturer,
        // through: { attributes: [] }
      }
    ]
  });

  res.status(200).json(mans);
}

async function add(req, res) {
  const { manufacturerId, name } = req.body;

  if (!manufacturerId) return res.status(400).json({ error: "Manufacturer id cannot be empty" });
  if (!name) return res.status(400).json({ error: "Name cannot be empty" });

  let man = await Manufacturer.findByPk(manufacturerId);
  if (!man) return res.status(401).json({ error: "Incorrect manufacturer id" });

  let mod = await InstrumentModel.create({
    manufacturerId: manufacturerId,
    name: name,
  });

  res.status(200).json(mod);
}

async function remove(req, res) {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });

  let mod = await InstrumentModel.destroy({
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