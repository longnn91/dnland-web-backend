const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
const PostSchema = mongoose.Schema ({
  datetime: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    require: true
  },
  location: {
    type: String,
    require: true
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.addPost = (newPost, callback) => {
  newPost.save(callback);
}

module.exports.getPostList = (callback) => {
  Post.find(null, null, callback).sort( { _id: -1 } );
}
