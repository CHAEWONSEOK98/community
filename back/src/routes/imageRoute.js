const { Router } = require('express');
const imageRouter = Router();

const { Image } = require('../models');
const { upload } = require('../middleware/imageUpload');

const { s3 } = require('../aws');

imageRouter.post('/', upload, async (req, res) => {
  console.log(req.file);
  const image = await new Image({
    key: req.file.key,
    originalFileName: req.file.originalname,
  }).save();
  res.json(image);
});

imageRouter.delete('/');

module.exports = { imageRouter };
