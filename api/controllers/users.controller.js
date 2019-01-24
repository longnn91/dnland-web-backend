const express = require('express');
const User = require('../models/users.model');

//Register
module.exports.register = (req, res, next) => {
  let newUser = new User({
    type: req.body.type,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, message: 'Failed to register user'});
    } else {
      res.json({success: true, message: 'User has been regstered successfully'});
    }
  });
}

module.exports.getList = (req, res, next) => {
  User.getUserList((err, userList) => {
    if (err) throw err;
    res.json({userList})
  });
}
