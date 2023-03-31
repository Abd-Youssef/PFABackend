const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // set the destination folder where the image will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // set the file name for the saved image
  },
});
const upload = multer({ storage: storage });

module.exports = upload