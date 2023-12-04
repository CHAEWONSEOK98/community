const { Router } = require('express');
const imageRouter = Router();

const { Image } = require('../models');
const { upload } = require('../middleware/imageUpload');

imageRouter.post('/', upload, async (req, res) => {
  const image = await new Image({
    key: req.file.filename,
    originalFileName: req.file.originalname,
  }).save();
  res.json(image);
});

module.exports = { imageRouter };
