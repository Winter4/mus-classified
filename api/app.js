require("dotenv").config();

const express = require("express");
require('express-async-errors');

const cors = require("cors");
const { sequelize } = require("./models");
const router = require("./router");

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(8080, () => console.log(`Server running on http://127.0.0.1:8080`));