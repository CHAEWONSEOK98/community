const multer = require('multer');

const { nanoid } = require('nanoid');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/img'),
  filename: (req, file, cb) =>
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
