const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbconfig = require('../config/dbconfig');

const userSchema = mongooose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'mod', 'admin'] },
    avatar: { type: String, required: false },
    phone: { type: Number, required: true },
    active: { type: Boolean, required: true, default: false },
    temporaryToken: { type: String, default: '' }
});

const User = module.exports = mongooose.model('User', userSchema);
module.exports.User = mongooose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.updateUser = function (updatedUser, rehash, callback) {
    if (rehash) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                if (err) throw err;
                updatedUser.password = hash;
                updatedUser.save(callback);
            });
        });
    }
    else {
        updatedUser.save(callback);
    }
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}