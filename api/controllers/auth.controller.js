const express = require('express');
const router = express.Router();
const https = require('https');
const User = require('../models/users.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.authenicate = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const type     = req.body.type;

  switch (type) {
    case 'origin':
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
      break;
      case 'google':
      case 'facebook':
        //Verify facebook token gainst to fake appId
        let token = req.body.token;
        let userId    = req.body.username;
        let requestURL = req.body.type === 'facebook' ?
        `https://graph.facebook.com/me?access_token=${token}` :
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;
        https.get(requestURL, (verify_res) => {
          verify_res.setEncoding('utf8');
          verify_res.on('data', body => {
            console.log(body);
            console.log(body.id);
            if (1) {
              User.getUserByUsername(username, (err, user) => {
                if(err) throw err;
                if(!user) {
                  let newUser = new User({
                    type: req.body.type,
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: ''
                  });

                  User.addUser(newUser, (err, user) => {
                    if(err) {
                      res.json({success: false, message: 'Failed to register user'});
                    }
                  });
                }
                let token = jwt.sign(user.toJSON(), config.secret, {
                  expiresIn: 605800 //1 week
                });
                res.json({
                  success: true,
                  token: 'bearer ' + token,
                  user: {
                    name: user.name,
                    username: user.username,
                    email: user.email
                  }
                });
              });
            } else {
              return res.status(403).json({success: false, msg: 'login token is not correct'});
            }
          });
        });
        break;
    default:
  }
}

module.exports.getProfile = (req, res, next) => {
  const { name, email, username} = req.user;
  const user = { name, email, username};
  res.json({user});
}
