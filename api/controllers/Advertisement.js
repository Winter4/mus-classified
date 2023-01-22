const { Advertisement, Image } = require("../models");

async function add(req, res) {
  const { headline, description, price, category, model, images } = req.body;

  if (!headline) return res.status(400).json({ error: "Headline cannot be empty" });
  if (!description) return res.status(400).json({ error: "Description cannot be empty" });
  if (!price) return res.status(400).json({ error: "Price number cannot be empty" });
  if (!category) return res.status(400).json({ error: "Category number cannot be empty" });
  if (!model) return res.status(400).json({ error: "Model number cannot be empty" });

  let ad = await Advertisement.create({
    userId: req.currentUser.id,
    headline,
    description,
    price,
    categoryId: category,
    modelId: model,
  });

  if (images.length) ad.setImages(images);

  res.status(200).json(ad);
}

async function getAll(req, res) {
  let { offset, count } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let ads = await Advertisement.findAll({
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

module.exports = {
  add,
  getAll
}