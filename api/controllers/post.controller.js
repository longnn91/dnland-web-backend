const express = require('express');
const Post = require('../models/post.model');
const POST_LOCATION = 'post';

//Create new POST
module.exports.create = (req, res, next) => {
  let images = [];
  req.files.forEach(item => {
    images.push(item.filename)
  })
  let newPost = new Post({
    location: POST_LOCATION,
    description: req.body.description,
    phone: req.body.phone,
    images: images
  });
  Post.addPost(newPost, (err, post) => {
    if (err) {
      res.json({success: false, message: 'Failed to create post'});
    } else {
      res.json({success: true, message: 'Create API successfully'});
    }
  });
}

module.exports.getList = (req, res, next) => {
  Post.getPostList((err, PostList) => {
    if (err) throw err;
    res.json({PostList});
  });
}
