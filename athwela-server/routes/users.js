const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const randomstring = require('randomstring');
const User = require('../models/user');
const email = require('../services/email');
const dbconfig = require('../config/dbconfig');

// asynchronous username availability check during registration
router.get('/username/:username', (req, res) => {
    User.find({ username: req.params.username }, (err, doc) => {
        if (err) throw err;
        else res.json({ exists: !!doc.length });
    });
});

// normal users
router.get('/user', (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    User.find({ role: 'user' }).skip((page - 1) * pagination).limit(pagination).exec((err, docs) => {
        if (!err)
            res.json({ success: true, users: docs });
        else
            res.json({ success: false, err: err })
    });
});

// normal user count
router.get('/user/count', (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    User.find({ role: 'user' }).countDocuments((err, count) => {
        if (!err)
            res.json({ userscount: count, success: true });
        else
            res.json({ success: false, error: err })
    });
});

//all users
router.get('/', (req, res) => {
    User.find({}, (err, doc) => {
        if (!err)
            res.send({ users: doc, success: true });

        else
            res.send({ success: false, error: err });
    });
});
// all moderators
router.get('/mod', (req, res) => {
    User.find({ role: 'mod' }, (err, doc) => {
        if (!err)
            res.send({ moderators: doc, success: true });
        else
            res.send({ success: false, error: err });
    });
});

// all administrators
router.get('/admin', (req, res) => {
    User.find({ role: 'admin' }, (err, doc) => {
        if (!err)
            res.send({ administrators: doc, success: true });
        else
            res.send({ success: false, error: err });
    });
});

router.post('/register', (req, res) => {
    // create a new user object
    let _user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        temporaryToken: randomstring.generate()
    });

    // check if a user with the username already exist
    User.find({ username: _user.username }, function (err, user) {
        if (user.length) {
            res.json({ success: false, username_exist: true });
        } else {
            // register new user account
            User.addUser(_user, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Registration failed. An unexpected error occured.',
                        username_exist: false
                    });
                } else {
                    console.log(user.temporaryToken);

                    var mailOptions = {
                        from: 'athwelafunds@gmail.com',
                        to: user.email,
                        subject: 'Activate your account at Athwela',
                        text: 'Hello ' + user.firstName + '. Thank you for registering at Athwela. Please click on the following link to complete your activation: http://localhost:4200/activate/' + _user.temporaryToken,
                        html: 'Hello<strong> ' + user.firstName + '</strong>,<br /><br />Thank you for registering at Athwela. Please click on the following link to complete your activation:<br /><br /><a href="http://localhost:4200/activate/' + _user.temporaryToken + '">http://localhost:4200/activate/</a>'
                    };

                    email.sendMail(mailOptions, (err, res) => {
                        if (err) throw err;
                        console.log(res);
                    });
                    res.json({
                        success: true,
                        msg: 'Registered successfully! Please check your email for the activation link.'
                    });
                }
            });
        }
    });
});

router.get('/activate/:temporaryToken', (req, res) => {
    console.log(req.params.temporaryToken);
    User.findOne({ temporaryToken: req.params.temporaryToken }, (err, user) => {
        if (err) throw err;
        console.log(user);

        user.active = true;
        user.save(function (err, user) {
            console.log(user);
            if (err) throw err;
            else {
                res.json({
                    success: true,
                    message: "Account activated!"
                });
            }
        });
    });
});

router.post('/register/mod', (req, res) => {
    // create a new moderator
    let _user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        role: "mod",
        active: true
    });

    // check if a user with the username already exist
    User.find({ username: _user.username }, function (err, user) {
        if (user.length) {
            res.json({ success: false, username_exist: true });
        } else {
            // register new user account
            User.addUser(_user, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Registration failed.' });
                } else {
                    res.json({ success: true, msg: 'Registered successfully.' });
                }
            });
        }
    });
});

router.post('/register/admin', (req, res) => {
    // create a new admin
    let _user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        role: "admin",
        active: true
    });

    // check if a user with the username already exist
    User.find({ username: _user.username }, function (err, user) {
        if (user.length) {
            res.json({ success: false, username_exist: true });
        } else {
            // register new user account
            User.addUser(_user, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: err });
                } else {
                    res.json({ success: true, msg: 'Registered successfully.' });
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
            return res.json({
                success: false,
                msg: "There is no account with that username. Please try again."
            });
        }

        if (!user.active) {
            console.log('User not active');

            return res.json({
                success: false,
                msg: "Your account has not been verified yet. Please check your e-mail for the verification email."
            });
        }

        // validate password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, dbconfig.secret, {
                    expiresIn: 604800 // equals to 1 week
                });

                // return user document
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        city: user.city,
                        address: user.city,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                        role: user.role,
                        phone: user.phone,
                        avatar: user.avatar
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Your password is incorrect. Please try again.' });
            }
        });
    });
});

router.post('/update/:_id', (req, res) => {
    // validate object id
    if (!ObjectId.isValid(req.params._id))
        return res.json({ success: false });

    // check if a user with the _id exist
    User.getUserById(req.params._id, function (err, user) {
        var rehash = false;
        if (!user) {
            res.json({ success: false });
        } else {
            if (req.body.firstName) { user.firstName = req.body.firstName; }
            if (req.body.lastName) { user.lastName = req.body.lastName; }
            if (req.body.email) { user.email = req.body.email; }
            if (req.body.address) { user.address = req.body.address; }
            if (req.body.city) { user.city = req.body.city; }
            if (req.body.phone) { user.phone = req.body.phone; }
            if (req.body.avatar) { user.avatar = req.body.avatar; }
            if (req.body.password) {
                rehash = true;
                user.password = req.body.password;
            }

            User.updateUser(user, rehash, (err, user) => {
                if (err) {
                    res.json({ success: false, error: err });
                } else {
                    res.json({ success: true, msg: 'Your details has been updated successfully.', user: user });
                }
            });
        }
    });
});

router.get('/profile/:id', (req, res) => {
    // validate object id
    if (!ObjectId.isValid(req.params.id))
        return res.json({ success: false });

    // locate user by id
    User.getUserById(req.params.id, (err, user) => {
        if (err) throw err;
        else {
            if (user) {
                return res.json({
                    success: true,
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        city: user.city,
                        address: user.city,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        phone: user.phone,
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
    // return all fields except hashed password
    res.json({
        user: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            city: req.user.city,
            address: req.user.city,
            email: req.user.email,
            username: req.user.username,
            role: req.user.role,
            phone: req.user.phone,
            avatar: req.user.avatar
        }
    })
});

router.delete('/:id', (req, res) => {
    // validate object id
    if (!ObjectId.isValid(req.params.id))
        return res.json({ success: false, msg: `User doesn't exist: ${req.params.id}` });

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ success: true, msg: 'User successfully deleted!' });
        } else {
            res.json({ success: false, error: err });
        }
    });
});

router.post('/resend-email', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        console.log(user.temporaryToken)
        if (err) {
            res.json({ success: false, msg: 'Username not found.' });
            throw (err);
        };
        var mailOptions = {
            from: 'athwelafunds@gmail.com',
            to: user.email,
            subject: 'Activate your account at Athwela',
            text: 'Hello ' + user.firstName + '. Thank you for registering at Athwela. Please click on the following link to complete your activation: http://localhost:4200/activate/' + user.temporaryToken,
            html: 'Hello<strong> ' + user.firstName + '</strong>,<br /><br />Thank you for registering at Athwela. Please click on the following link to complete your activation:<br /><br /><a href="http://localhost:4200/activate/' + user.temporaryToken + '">http://localhost:4200/activate/</a>'
        };

        email.sendMail(mailOptions, (err, res) => {
            if (err) throw err;
            console.log(res);
        });
        res.json({ success: true, msg: 'Email sent. Please check your inbox and confirm activation.' });
    });
});

module.exports = router;