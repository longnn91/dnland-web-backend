const express = require('express');
const router = express.Router();
const User = require('../models/users.model');

//Register
module.exports.register = (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User has been regstered successfully'});
    }
  });
}

module.exports.getList = (req, res, next) => {
  User.getUserList((err, userList) => {
    if (err) throw err;
    res.json({userList})
  });
}
