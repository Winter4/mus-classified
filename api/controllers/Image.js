const { Image } = require("../models");
const randomString = require("../helpers/randomString");

async function upload(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No images were uploaded" });
  }

  let name = randomString(15);
  let ext = req.files.image.name.split('.').pop();
  let path = `${name}.${ext}`;

  if (!['jpg', 'jpeg', 'png', 'gif'].includes(ext)){
    return res.status(400).json({ error: "Unsupported file type" });
  }

  req.files.image.mv(`./upload_files/images/${path}`);

  let image = await Image.create({
    path
  });

  return res.status(200).json(image);
}

module.exports = {
  upload,
}