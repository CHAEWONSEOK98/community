const multer = require('multer');

const multerS3 = require('multer-s3');
const { s3 } = require('../aws');

const { nanoid } = require('nanoid');
const mime = require('mime-types');

const storage = multerS3({
  s3,
  bucket: 'image-foundation',
  key: (req, file, cb) =>
    cb(null, `${nanoid()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype))
      cb(null, true);
    else cb(new Error('invalid file type.'), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single('image');

module.exports = { upload };
