const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// TODO
// Add protected endpoints for Administrator to register Moderators into the system
// Then set default user role to 'user' and make 'admin and 'mod' users possible only by an Administrator

// TODO
// Expand error messages

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role // temporary
    });

    User.find({ username: newUser.username }, function (err, docs) {
        if (docs.length) {
            res.json({ success: false, username_exist: true });
        } else {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register user' });
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
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
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