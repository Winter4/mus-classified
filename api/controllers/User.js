const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../helpers/jwt");
const { Op } = require('sequelize');

async function register(req, res) {
  const { email, password, phoneNumber } = req.body;

  if (!email) return res.status(400).json({ error: "Email cannot be empty" });
  if (!password) return res.status(400).json({ error: "Password cannot be empty" });
  if (!phoneNumber) return res.status(400).json({ error: "Phone number cannot be empty" });

  let user = await User.findOne({
    where: { email }
  });

  if (user) return res.status(400).json({ error: "Email already taken" });

  user = await User.create({
    email: email,
    password: await bcrypt.hash(password, 10),
    phoneNumber: phoneNumber,
  });

  const token = jwt.sign(user.id);

  return res.status(200).json({ token: token });
}

async function authorize(req, res) {
  let { email, password, phoneNumber } = req.body;

  email = email || null;
  phoneNumber = phoneNumber || null;

  if (!email && !phoneNumber) return res.status(400).json({ error: "Both email and phone number cannot be empty" });
  if (!password) return res.status(400).json({ error: "Password cannot be empty" });
  
  let user = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { phoneNumber }
      ]
    }
  });

  if (user) {
    const token = jwt.sign(user.id);
    return res.status(200).json({ token: token });
  }
  else {
    return res.status(401).json({ error: "Incorrect credentials" });
  }
}

module.exports = {
  register,
  authorize,
}