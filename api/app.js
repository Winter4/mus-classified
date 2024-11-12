require("dotenv").config();
const fs = require('fs');

const express = require("express");
require('express-async-errors');

const fileUpload = require('express-fileupload');
const cors = require("cors");
const { sequelize } = require("./models");
const router = require("./routes");

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// create static folders
if(!fs.existsSync('./upload_files')) fs.mkdirSync('./upload_files');
if(!fs.existsSync('./upload_files/images')) fs.mkdirSync('./upload_files/images/')

app.use("/api", router);

app.use('/upload', express.static('upload_files'));

app.listen(8080, () => console.log(`Server running on http://127.0.0.1:8080`));