const express = require('express');
const multer  = require('multer')
const router = express.Router();
const postController = require('../controllers/post.controller');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname + '/../../dist')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}`)
  }
});
const upload = multer({ storage: storage });

//Create, update, delete post
router.post('', upload.array('images', 12), postController.create);

module.exports = router;
