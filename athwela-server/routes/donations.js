const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const appconfig = require('../config/appconfig');
const { Campaign } = require('../models/campaign');
const { Donation } = require('../models/donation');

router.post('/:campaign_id/:user_id', (req, res) => {
    const newDonation = new Donation({
        _id: req.body.order_id,
        payment_id: req.body.payment_id,
        amount: req.body.payhere_amount,
        currency: req.body.payhere_currency,
        status_code: req.body.status_code,
        status_message: req.body.status_message,
        method: req.body.method,
    });

    // // check if a user with the username already exist
    // User.find({ username: newUser.username }, function (err, user) {
    //     if (user.length) {
    //         res.json({ success: false, username_exist: true });
    //     } else {
    //         // register new user account
    //         User.addUser(newUser, (err, user) => {
    //             if (err) {
    //                 res.json({ success: false, msg: 'moderator registration failed.' });
    //             } else {
    //                 res.json({ success: true, msg: 'moderator registered successfully' });
    //             }
    //         });
    //     }
    // });
})

module.exports = router;