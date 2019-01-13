const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
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
var handleError = (req, res, next) => {
  // req.checkBody('email', 'Email is not a valid format').isEmail();
  req.getValidationResult()
  .then((validationResult) => {
    if (!validationResult.isEmpty()) {
      res.status(422).json({
        result: 'Failed',
        message: validationResult.array().map(i => {
          let result = {};
          result[i.param] = i.message;
          return result;
        })
      });
    } else {
      next();
    }
  })
  .catch(next);
}

module.exports.register = (validate('register-user'), handleError);
