const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const { Campaign } = require('../models/campaign');
const { Donation, currency } = require('../models/donation');
const { Withdrawal } = require('../models/withdrawal');
const appconfig = require('../config/appconfig');
const payhere = require('../config/payhere');

router.get('/', (req, res) => {
    // return all donations
    Donation.find().populate('campaign').exec((err, docs) => {
        if (!err)
            res.json({ donations: docs, success: true });
        else
            res.json({ success: false, error: err });
    });
});

router.get('/withdrawals', (req, res) => {
    // return all withdrawals
    Withdrawal.find().populate('donations').populate('user', '-password').exec((err, docs) => {
        if (!err)
            res.json({ withdrawals: docs, success: true });
        else
            res.json({ success: false, error: err });
    });
});

router.get('/:id', (req, res) => {
    // locate donation with given id
    Donation.findOne({ donation_id: req.params.id }, (err, doc) => {
        if (!err)
            res.send({ success: true, donation: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/withdrawals/user/:userId', (req, res) => {
    // return all documents
    Withdrawal.find({ user: req.params.userId }).populate('donations').exec((err, docs) => {
        if (!err)
            res.json({ withdrawals: docs, success: true });
        else
            res.json({ success: false, error: err });
    });
});

router.get('/user/:id/donated', (req, res) => {
    // locate donations with given donor id
    Donation.find({ donor: req.params.id })
        .populate('campaign', '-donations')
        .exec(function (err, docs) {
            if (err) res.json({ error: err, success: false });
            donations_id = docs.map((d) => { return mongoose.Types.ObjectId(d._id) });
            Donation.aggregate([{
                $match: {
                    _id: { "$in": donations_id }
                }
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$amount"
                    }
                }
            }], (err, doc) => {
                if (err) res.json({ error: err, success: false });
                res.json({ donations: docs, amount: doc[0] ? doc[0].amount : 0 });
            });
        });
});

router.get('/user/:id/donated/sum', (req, res) => {
    // needs to be optimized
    Donation.aggregate([{
        $match: {
            donor: new ObjectId(req.params.id)
        }
    },
    {
        $group: {
            _id: null,
            amount: {
                $sum: "$amount"
            }
        }
    }], (err, doc) => {
        if (err) res.json({ error: err, success: false });
        res.json({ amount: doc[0] ? doc[0].amount : 0 });
    });
});

router.get('/user/:id/received', (req, res) => {
    // locate user campaigns
    Campaign.find({ owner: new ObjectId(req.params.id) }).exec((err, campaigns) => {
        if (err) res.json({ error: err, success: false });
        const campaigns_id = campaigns.map((campaign) => {
            return mongoose.Types.ObjectId(campaign._id);
        });

        Donation.find({ campaign: campaigns_id })
            .populate('campaign', '-comments -donations')
            .exec((err, donations) => {
                if (err) res.json({ error: err, success: false });
                // calculate total amount
                donations_id = donations.map((d) => { return mongoose.Types.ObjectId(d._id) });
                Donation.aggregate([{
                    $match: {
                        _id: { "$in": donations_id }
                    }
                },
                {
                    $group: {
                        _id: null,
                        amount: {
                            $sum: "$amount"
                        }
                    }
                }], (err, doc) => {
                    if (err) res.json({ error: err, success: false });
                    res.json({ donations: donations, amount: doc[0] ? doc[0].amount : 0 });
                });
            });
    });
});

router.get('/user/:id/not_withdrawen', (req, res) => {
    // locate user campaigns
    Campaign.find({ owner: new ObjectId(req.params.id) }).exec((err, campaigns) => {
        if (err) res.json({ error: err, success: false });
        const campaigns_id = campaigns.map((campaign) => {
            return mongoose.Types.ObjectId(campaign._id);
        });


        Donation.find({ campaign: campaigns_id, withdrew: false })
            .populate('campaign', '-comments -donations')
            .exec((err, donations) => {
                if (err) res.json({ error: err, success: false });
                // calculate total amount
                donations_id = donations.map((d) => { return mongoose.Types.ObjectId(d._id) });
                Donation.aggregate([{
                    $match: {
                        _id: { "$in": donations_id }
                    }
                },
                {
                    $group: {
                        _id: null,
                        amount: {
                            $sum: "$amount"
                        }
                    }
                }], (err, doc) => {
                    if (err) res.json({ error: err, success: false });
                    res.json({ donations: donations, amount: doc[0] ? doc[0].amount : 0 });
                });
            });
    });
});

router.post('/withdraw', passport.authenticate("jwt", { session: false }), (req, res) => {
    const donations = req.body.donations;
    const bank_account = req.body.bank_account;
    const bank_name = req.body.bank_name;
    const payee_name = req.body.payee_name;
    const user = req.user._id;

    Donation.updateMany({ _id: donations }, { $set: { withdrew: true } },
        (err, doc) => {
            if (err) throw err;
            donations_id = donations.map((id) => { return mongoose.Types.ObjectId(id) });
            Donation.aggregate([{
                $match: {
                    _id: { "$in": donations_id }
                }
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$amount"
                    }
                }
            }], (err, doc) => {
                if (err) throw err;
                const withdrawal = new Withdrawal({
                    amount: doc[0] ? don[0].amount : 0,
                    currency: currency,
                    donations: donations_id,
                    bank_name: bank_name,
                    bank_account: bank_account,
                    payee_name: payee_name,
                    user: user
                });

                console.log("comparing");
                if (withdrawal.amount < payhere.minimum_withdraw) {
                    res.json({ success: false, err: "Your balance does not exceed minimum withdrawal amount." });
                }

                withdrawal.save((err, doc) => {
                    if (err) throw err;
                    res.json({ withdrawal: doc, success: true });
                })
            });
        });
})

router.post('/:campaign_id/:user_id', (req, res) => {
    const new_donation = new Donation({
        donation_id: req.body.order_id,
        payment_id: req.body.payment_id,
        amount: req.body.payhere_amount,
        currency: req.body.payhere_currency,
        status_code: req.body.status_code,
        status_message: req.body.status_message,
        method: req.body.method,
        donor: req.params.user_id,
        campaign: req.params.campaign_id
    });

    // TODO
    // validate campaign and user
    // check hashing with merchant secret

    // check if donation already exist
    Donation.find({ donation_id: new_donation.donation_id }, (err, donation) => {
        if (donation.length) {
            // already exist
            Donation.findOneAndUpdate({ donation_id: new_donation.donation_id }, {
                status_code: new_donation.status_code,
                status_message: new_donation.status_message
            },
                { new: true }, (err, don) => {
                    if (err) {
                        res.json({ success: false, error: err });
                    }
                    else {
                        // update campaign
                        Campaign.findOneAndUpdate({
                            "_id": req.params.campaign_id,
                            "donations._id": don._id
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
                    Campaign.findOne({ _id: req.params.campaign_id }, (err, cmp) => {
                        cmp.raised += don.amount;
                        cmp.complete = (cmp.raised + don.amount >= cmp.target);
                        cmp.donations.push(new_donation);
                        cmp.save((err, cmp_new) => {
                            if (err) res.json({ success: false, error: err });
                            else {
                                res.json({ success: true, updated: true, donation: don, campaign: cmp });
                            }
                        });
                    });
                }
                else
                    res.json({ success: false, error: err });
            });
        }
    });
})

module.exports = router;