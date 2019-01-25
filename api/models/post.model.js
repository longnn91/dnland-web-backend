const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
const PostSchema = mongoose.Schema({
  datetime: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    require: true
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.addPost = (newPost, callback) => {
  newUser.save(callback);
}
