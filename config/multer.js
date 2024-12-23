const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const multerFilter = (req, file, cb) => {
  if (path.extname(file.originalname) == '.csv','pdf','jpeg','png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Upload any of pfd, jpeg, png or csv files.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { filesize: 5000000 },
  fileFilter: multerFilter,
});

module.exports = { upload };