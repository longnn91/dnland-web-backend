const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.authenicate = (req, res, next) => {
  console.log(req);
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.status(403).json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 605800 //1 week
        });
        res.json({
          success: true,
          token: 'bearer ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
            // password: user.password
          }
        });
      } else {
        return res.status(403).json({success: false, msg: 'password wrong'});
      }
    });
  });
}

module.exports.getProfile = (req, res, next) => {
  const { name, email, username} = req.user;
  const user = { name, email, username};
  res.json({user});
}
