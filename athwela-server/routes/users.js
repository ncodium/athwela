const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');

//get all users
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err)
            res.json({ users: docs, success: true });
        else
            res.json({ success: false, error: err })
    });
});

//get moderators
router.get('/mod', (req, res) => {
    User.find({ 'role': 'mod' })
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, users: doc });
            else
                res.send({ success: false, error: err });
        });
});

 


router.post('/register', (req, res, next) => {
    // create a new user object
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    // check if a user with the username already exist
    User.find({ username: newUser.username }, function (err, user) {
        if (user.length) {
            res.json({ success: false, username_exist: true });
        } else {
            // register new user account
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'User registration failed.' });
                } else {
                    res.json({ success: true, msg: 'User registered successfully' });
                }
            });
        }
    });
});

router.post('/register/mod', (req, res, next) => {
    // create a new moderator
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: "mod"
    });

    // check if a user with the username already exist
    User.find({ username: newUser.username }, function (err, user) {
        if (user.length) {
            res.json({ success: false, username_exist: true });
        } else {
            // register new user account
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'moderator registration failed.' });
                } else {
                    res.json({ success: true, msg: 'moderator registered successfully' });
                }
            });
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "Username and password doesn't match. Please try again." });
        }

        // validate password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // equals to 1 week
                });

                // return user document
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Incorrect password.' });
            }
        });
    });
});

router.post('/update/:_id', (req, res, next) => {
    // validate object id
    if (!ObjectId.isValid(req.params._id))
        return res.json({ success: false });

    // check if a user with the _id exist
    User.getUserById(req.params._id, function (err, user) {
        var rehash = false;
        if (!user) {
            res.json({ success: false });
        } else {
            if (req.body.name) { user.name = req.body.name; }
            if (req.body.email) { user.email = req.body.email; }
            if (req.body.avatar) { user.avatar = req.body.avatar; }
            if (req.body.password) {
                rehash = true;
                user.password = req.body.password;
            }

            User.updateUser(user, rehash, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'User update failed.' });
                } else {
                    res.json({ success: true, msg: 'User updated successfully' });
                }
            });
        }
    });
});

router.get('/profile/:id', (req, res) => {
    // locate user with given id
    if (!ObjectId.isValid(req.params.id))
        return res.json({ success: false });

    User.getUserById(req.params.id, (err, user) => {
        if (err) { throw err; }
        else {
            if (user) {
                return res.json({
                    success: true,
                    user: {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar
                    }
                })
            }
            else {
                return res.json({ success: false });
            }
        }
    });
});

router.get('/profile', passport.authenticate("jwt", { session: false }), (req, res) => {
    // return user with all other fields except hashed password
    res.json({
        user: {
            _id: req.user._id,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role,
            avatar: req.user.avatar
        }
    })
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.send({ success: false, msg: `No user exist with given Id: ${req.params.id}` });

    Campaign.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            res.send({ success: false, error: err });
        }
    });
});

module.exports = router;