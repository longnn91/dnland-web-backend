const express = require('express');

//Create new POST
module.exports.create = (req, res, next) => {
  console.log(req.file);
  // console.log(req.body);
  res.json({success: true, message: 'Enter creaet post API'});
}
