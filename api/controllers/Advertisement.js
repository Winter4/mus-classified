const { Advertisement, Image, User, Manufacturer, InstrumentModel, Sequelize } = require("../models");
const adModerStatus = require('../helpers/adModerStatus');
const adExpertStatus = require('../helpers/adExpertStatus');

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
    moderStatus: adModerStatus.CREATED,
  });

  if (images.length) ad.setImages(images);

  await ad.save();

  res.status(200).json(ad);
}

async function getAll(req, res) {
  let { offset, count, userId, categoryId, manufacturerId, modelIds, searchQuery } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let where = {
    moderStatus: adModerStatus.PUBLISHED,
  };
  if (Number(userId)) {
    where.userId = userId;
    if (userId == req?.currentUser?.id) delete where.moderStatus;
  }
  if (Number(categoryId)) where.categoryId = categoryId;
  if (searchQuery?.length) {
    where[Sequelize.Op.or] = {
      headline: { [Sequelize.Op.like]: '%' + searchQuery + '%' },
      description: { [Sequelize.Op.like]: '%' + searchQuery + '%' },
    }
  }
  
  let manufacturerWhere = {};
  if (Number(manufacturerId)) manufacturerWhere.id = manufacturerId;

  let modelWhere = {};
  if (modelIds) {
    modelWhere.id = {};
    modelWhere.id[Sequelize.Op.in] = modelIds.split(',');
  }

  let ads = await Advertisement.findAll({
    where,
    include: [
      {
        model: Image,
        through: { attributes: [] }
      },
      {
        model: InstrumentModel,
        where: modelWhere,
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

async function getModer(req, res) {
  let { offset, count } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let ads = await Advertisement.findAll({
    where: {
      moderStatus: adModerStatus.CREATED,
    },
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
          },
        ]
      }
    ],
    offset: offset,
    limit: count,
  });

  res.status(200).json(ads);
}

async function editModer(req, res) {
  const { id, moderStatus, moderReason } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });
  if (!moderStatus) return res.status(400).json({ error: "Status cannot be empty" });

  let ad = await Advertisement.findByPk(id);

  if (!ad) return res.status(400).json({ error: "Incorrect id" });

  await ad.update({
    moderStatus,
    moderReason,
  });

  await ad.save();

  res.status(200).json(ad);
}

async function getExpert(req, res) {
  let { offset, count } = req.query;

  offset = Number(offset) || 0;
  count = Number(count) || 20;

  let ads = await Advertisement.findAll({
    where: {
      expertStatus: adExpertStatus.REQUESTED,
    },
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
          },
        ]
      }
    ],
    offset: offset,
    limit: count,
  });

  res.status(200).json(ads);
}

async function editExpert(req, res) {
  const { id, expertStatus, expertReview } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });
  if (!expertStatus) return res.status(400).json({ error: "Status cannot be empty" });
  if (!expertReview) return res.status(400).json({ error: "Review cannot be empty" });

  let ad = await Advertisement.findByPk(id);

  if (!ad) return res.status(400).json({ error: "Incorrect id" });

  await ad.update({
    expertStatus,
    expertReview,
  });

  await ad.save();

  res.status(200).json(ad);
}

async function requestReview(req, res) {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Id cannot be empty" });
  
  let ad = await Advertisement.findByPk(id);

  if (!ad) return res.status(400).json({ error: "Incorrect id" });

  await ad.update({
    expertStatus: adExpertStatus.REQUESTED,
  });

  await ad.save();

  res.status(200).json(ad);
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
  getModer,
  editModer,
  getExpert,
  editExpert,
  requestReview,
  get,
  remove
}