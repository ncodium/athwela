const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
    // create a new user object
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
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
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Incorrect password.' });
            }
        });
    });
});

router.get('/profile/:id', (req, res) => {
    // locate user with given id
    User.getUserById(req.params.id, (err, user) => {
        if (err) {
            return res.json({ success: false });
        }
        else {
            return res.json({ success: false, user: user });
        }
    });
});

router.get('/profile', passport.authenticate("jwt", { session: false }), (req, res, next) => {
    // return user with all other fields except hashed password
    res.json({
        user: {
            _id: req.user._id,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        }
    })
});

module.exports = router;