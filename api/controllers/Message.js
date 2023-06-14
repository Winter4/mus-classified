const { User, Message, sequelize, Sequelize } = require("../models");

async function add(req, res) {
  const { userId, text } = req.body;

  if (!userId) return res.status(400).json({ error: "User Id cannot be empty" });
  if (!text) return res.status(400).json({ error: "Text cannot be empty" });

  let userTo = await User.findByPk(userId);

  if (!userTo) return res.status(400).json({ error: "Incorrect userId" });

  await Message.create({
    fromId: req.currentUser.id,
    toId: userTo.id,
    text
  });

  return res.status(200).json();
}

async function getAll(req, res) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "User Id cannot be empty" });

  let userTo = await User.findByPk(userId);

  if (!userTo) return res.status(400).json({ error: "Incorrect userId" });
  
  let messages = await Message.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          fromId: req.currentUser.id,
          toId: userTo.id,
        },
        {
          fromId: userTo.id,
          toId: req.currentUser.id,
        }
      ]
    },
    order: [
      ['id', 'ASC'],
    ],
  });

  return res.status(200).json(messages);
}

async function getDialogs(req, res) {
  let dialogs = await User.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: sequelize.literal(`(SELECT fromId FROM messages WHERE toId = ${req.currentUser.id})`),
      }
    },
    attributes: {
      exclude: ['password']
    },
  })
  
  return res.status(200).json(dialogs);
}

module.exports = {
  add,
  getAll,
  getDialogs
}