const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

//Authenicate
router.post('/login', authController.authenicate);

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), authController.getProfile);

module.exports = router;
