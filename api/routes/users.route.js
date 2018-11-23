const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
  console.log('enter....');
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
});

//Authenicate
router.post('/authenicate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
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
        return res.json({success: false, msg: 'password wrong'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
