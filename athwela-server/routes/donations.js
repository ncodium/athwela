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

    // check if donation already exist
    Donation.find({ _id: newDonation._id }, function (err, donation) {
        // if (donation.length) {
        //     // already exist
        //     Donation.findByIdAndUpdate()
        //     Campaign.findByIdAndUpdate()
        // } else {
        //     // register new user account
        //     Donation.
        // }
    });
})

module.exports = router;