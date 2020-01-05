const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const appconfig = require('../config/appconfig');
const { Campaign } = require('../models/campaign');
const { Donation, donationSchema } = require('../models/donation');

router.post('/:campaign_id/:user_id', (req, res) => {
    const new_donation = new Donation({
        _id: req.body.order_id,
        payment_id: req.body.payment_id,
        amount: req.body.payhere_amount,
        currency: req.body.payhere_currency,
        status_code: req.body.status_code,
        status_message: req.body.status_message,
        method: req.body.method,
    });

    // TODO
    // validate campaign and user
    // check hashing

    // check if donation already exist
    Donation.find({ _id: new_donation._id }, function (err, donation) {
        if (donation.length) {
            // already exist
            Donation.findByIdAndUpdate(new_donation._id, new_donation, { new: true }, (err, don) => {
                if (err) {
                    res.json({ success: false, error: err });
                }
                else {
                    // update campaign
                    Campaign.findOneAndUpdate({
                        "_id": req.params.campaign_id,
                        "donations._id": new_donation._id
                    }, {
                        // update status
                        $set: {
                            "donations.$.status_code": new_donation.status_code,
                            "donations.$.status_message": new_donation.status_message
                        }
                    }, { new: true }, (err, cmp) => {
                        if (!err) {
                            res.json({ success: true, updated: true, donation: don, campaign: cmp });
                        } else {
                            res.json({ success: false, error: err });
                        }
                    });
                }
            })

        } else {
            // does not exist
            new_donation.save((err, don) => {
                if (!err) {
                    // add to campaign
                    Campaign.findByIdAndUpdate(req.params.campaign_id, { $push: { donations: new_donation } }, { new: true }, (err, cmp) => {
                        if (!err) {
                            res.json({ success: true, updated: true, donation: don, campaign: cmp });
                        } else {
                            res.json({ success: false, error: err });
                        }
                    });
                }
                else
                    res.json({ success: false, error: err })
            });

        }
    });
})

module.exports = router;