const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
const UserSchema = mongoose.Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserList = (callback) => {
  const configField = {
    password: 0
  }
  User.find(null, configField, callback);
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username };
  User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
