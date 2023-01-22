// const { Image } = require("../models");
const { Advertisement } = require("../models");

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

module.exports = {
  add
}