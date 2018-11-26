const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const util = require('util');
const { body } = require('express-validator/check');

const validate = (method) => {
  switch (method) {
    case 'register-user':
      return [
        body('name', 'Name can not blank').exists(),
        body('email', 'Email is not valid').isEmail()
      ]
      break;
    default:
  }
}

//Register
router.post('/register', validate('register-user'), (req, res, next) => {
  console.log('enter....');
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  // req.checkBody('email', 'Email is not a valid format').isEmail();
  req.getValidationResult()
  .then((validationResult) => {
    if (!validationResult.isEmpty()) {
      res.status(422).json({
        result: 'Failed',
        message: validationResult.array().map(i => {
          let result = {};
          result[i.param] = i.msg;
          return result;
        })
      });
    } else {
      User.addUser(newUser, (err, user) => {
        if(err) {
          res.json({success: false, msg: 'Failed to register user'});
        } else {
          res.json({success: true, msg: 'User has been regstered successfully'});
        }
      });
    }
  })
  .catch(next);
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
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { name, email, username} = req.user;
  const user = { name, email, username};
  res.json({user});
});

router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.getUserList((err, userList) => {
    if (err) throw err;
    res.json({userList})
  });
});

module.exports = router;
