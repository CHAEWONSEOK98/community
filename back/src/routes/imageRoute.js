const { Router } = require('express');
const imageRouter = Router();

const { Image } = require('../models');
const { upload } = require('../middleware/imageUpload');

const { s3 } = require('../aws');

imageRouter.post('/', upload, async (req, res, next) => {
  try {
    const image = await new Image({
      key: req.file.key,
      originalFileName: req.file.originalname,
    }).save();
    res.json(image);
  } catch (error) {
    next(error);
  }
});

imageRouter.delete('/:imageKey', async (req, res, next) => {
  try {
    const { imageKey } = req.params;

    const image = await Image.findOneAndDelete({ key: imageKey });
    if (!image)
      return res.json({ message: '요청하신 사진은 이미 삭제되었습니다.' });

    s3.deleteObject(
      { Bucket: 'image-foundation', Key: `${image.key}` },
      (error) => {
        if (error) throw error;
      }
    );

    res.json('삭제 완료!');
  } catch (error) {
    next(error);
  }
});

module.exports = { imageRouter };
