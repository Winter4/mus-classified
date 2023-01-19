require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.all("*", (req, res) => {
  res.status(404).json({ error: 404 })
});
app.use(errorHandler);

app.listen(8080, () => console.log(`Server running on http://127.0.0.1:8080`));