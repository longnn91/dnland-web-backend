const express = require('express');
const Post = require('../models/post.model');

//Create new POST
module.exports.create = (req, res, next) => {
  console.log(req.files);
  console.log(req.body);
  res.json({success: true, message: 'Enter creaet post API'});
}
