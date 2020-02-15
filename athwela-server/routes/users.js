const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');
const config = require('../config/database');

// asynchronous username availability check during registration
router.get('/username/:username', (req, res) => {
    User.find({ username: req.params.username }, (err, doc) => {
        if (err) next(err);
        else res.json({ exists: !!doc.length });
    });
});

//get a barchart
router.get('/barchart',(req,res)=>{
    User.countDocuments({role:'user'},(err,c)=>{
        if(err) next(err);
        res.send(docs)
        
        //console.log(usercount);
    });
    // User.countDocuments({role:'mod'},function(err,c){
    //     modcount=c;
    // });
    // User.countDocuments({role:'admin'},function(err,c){
    //     admincount=c;
        
    // });

});

//get all users
router.get('/', (req, res) => {
    
    User.find({ },(err, docs) => {
        if (!err)
            res.json({ allusers: docs, success: true });
        else
            res.json({ success: false, error: err })
    });
});

// normal users
router.get('/user', (req, res) => {
    const pagination=req.query.pagination ? parseInt(req.query.pagination):8;
    const page=req.query.page ? parseInt(req.query.page):1;
    User.find({ role: 'user' }).skip((page-1)*pagination).limit(pagination).exec((err, docs) => {
        if (!err)
            res.json({ users: docs, success: true });
        else
            res.json({ success: false, error: err })
    });
});
//normal user count
router.get('/user/count', (req, res) => {
    const pagination=req.query.pagination ? parseInt(req.query.pagination):8;
    const page=req.query.page ? parseInt(req.query.page):1;
    User.find({ role: 'user' }).count((err, count) => {
        if (!err)
            res.json({ userscount: count, success: true });
        else
            res.json({ success: false, error: err })
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
    });

    // check if a user with the username already exist
    User.find({ username: _user.username }, function (err, user) {
        if (user.length) {
            res.json({ success: false, username_exist: true });
        } else {
            // register new user account
            User.addUser(_user, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Registration failed' });
                } else {
                    res.json({ success: true, msg: 'Registered successfully' });
                }
            });
        }
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
        role: "mod"
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
        role: "admin"
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
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false, msg:
                    "Username and password doesn't match. Please try again."
            });
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
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            city: req.user.city,
            address: req.user.city,
            email: req.user.email,
            username: req.user.username,
            password: req.user.password,
            role: req.user.role,
            phone: req.user.phone,
            avatar: req.user.avatar
        }
    })
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send({ success: false, msg: `No user exist with given Id: ${req.params.id}` });
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.status(202).send({ success: true, msg: 'User successfully deleted!' });
        } else {
            res.status(406).send({ success: false, error: err });
        }
    });
});

module.exports = router;