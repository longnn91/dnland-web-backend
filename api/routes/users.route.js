const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');
const usersController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middleware');

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
router.post('/register', userMiddleware.register, usersController.register);

router.get('/list', passport.authenticate('jwt', {session: false}), usersController.getList);

module.exports = router;
