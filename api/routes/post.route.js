const express = require('express');
const multer  = require('multer')
const router = express.Router();
const postController = require('../controllers/post.controller');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname + '/../../dist')
  },
  filename: function (req, file, cb) {
    console.log(file.fieldname);
    cb(null, file.fieldname)
  }
});
const upload = multer({ storage: storage });

//Create, update, delete post
router.post('', upload.single('avatar'), postController.create);

module.exports = router;
