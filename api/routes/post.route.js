const express = require('express');
const multer  = require('multer')
const router = express.Router();
const postController = require('../controllers/post.controller');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname + '/../../dist/post')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}`)
  }
});
const upload = multer({ storage: storage });

//Create new Post
router.post('', upload.array('images', 12), postController.create);

//Get list Post
router.get('', postController.getList);

module.exports = router;
