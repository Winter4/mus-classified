const { Advertisement, Image, User, Manufacturer, InstrumentModel } = require("../models");

async function add(req, res) {
  const { headline, description, price, categoryId, modelId, images } = req.body;

  if (!headline) return res.status(400).json({ error: "Headline cannot be empty" });
  if (!description) return res.status(400).json({ error: "Description cannot be empty" });
  if (!price) return res.status(400).json({ error: "Price number cannot be empty" });
  if (!categoryId) return res.status(400).json({ error: "Category number cannot be empty" });
  if (!modelId) return res.status(400).json({ error: "Model number cannot be empty" });

  let ad = await Advertisement.create({
    userId: req.currentUser.id,
    headline,
    description,
    price,
    categoryId,
    modelId,
  });

  if (images.length) ad.setImages(images);

  res.status(200).json(ad);
}

async function edit(req, res) {
  const { id, headline, description, price, categoryId, modelId, images } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });
  if (!headline) return res.status(400).json({ error: "Headline cannot be empty" });
  if (!description) return res.status(400).json({ error: "Description cannot be empty" });
  if (!price) return res.status(400).json({ error: "Price number cannot be empty" });
  if (!categoryId) return res.status(400).json({ error: "Category number cannot be empty" });
  if (!modelId) return res.status(400).json({ error: "Model number cannot be empty" });

  let ad = await Advertisement.findByPk(id);

  if (!ad) return res.status(400).json({ error: "Incorrect id" });

  await ad.update({
    headline,
    description,
    price,
    categoryId,
    modelId,
  });

  if (images.length) ad.setImages(images);

  await ad.save();

  res.status(200).json(ad);
}

async function getAll(req, res) {
  let { offset, count, categoryId, manufacturerId } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let where = {};
  if (Number(categoryId)) where.categoryId = categoryId;
  
  let manufacturerWhere = {};
  if (Number(manufacturerId)) manufacturerWhere.id = manufacturerId;

  let ads = await Advertisement.findAll({
    where,
    include: [
      {
        model: Image,
        through: { attributes: [] }
      },
      {
        model: InstrumentModel,
        include: [
          {
            model: Manufacturer,
            where: manufacturerWhere
          },
        ]
      }
    ],
    offset: offset,
    limit: count,
  });

  res.status(200).json(ads);
}

async function getMy(req, res) {
  let { offset, count } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let ads = await Advertisement.findAll({
    where: {
      userId: req.currentUser.id
    },
    include: [
      {
        model: Image,
        through: { attributes: [] }
      }
    ],
    offset: offset,
    limit: count,
  });

  res.status(200).json(ads);
}

async function get(req, res) {
  let { id } = req.query;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });

  let ad = await Advertisement.findOne({
    where: { id },
    include: [
      {
        model: InstrumentModel,
      },
      {
        model: Image,
        through: { attributes: [] }
      },
      {
        model: User,
        attributes: {
          exclude: ['password']
        }
      },
    ]
  });

  if (!ad) return res.status(404).json({ error: "Incorrect id" });

  res.status(200).json(ad);
}

async function remove(req, res) {
  let { id } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });

  await Advertisement.destroy({
    where: {
      id: id,
      userId: req.currentUser.id,
    }
  });

  res.status(200).json();
}

module.exports = {
  add,
  edit,
  getAll,
  getMy,
  get,
  remove
}