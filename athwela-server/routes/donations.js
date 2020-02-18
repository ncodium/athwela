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
    Donation.find()
        // skip fields to reduce size
        .populate('campaign', '-donations -comments -images -documents -description')
        .exec((err, doc) => {
            if (err) throw err;
            res.send(doc);
        });
});

router.get('/date/:start/:end', (req, res) => {
    Donation.find({
        // within date range
        created_at: {
            $gte: new Date(new Date(req.params.start).setHours(00, 00, 00)),
            $lt: new Date(new Date(req.params.end).setHours(23, 59, 59))
        }
    }).sort({ created_at: 'asc' }).populate('owner').exec((err, doc) => {
        if (err) throw err;
        res.send(doc)
    });
})

router.get('/:id', (req, res) => {
    // locate donation with given id
    Donation.findOne({ donation_id: req.params.id }, (err, doc) => {
        if (err) throw err;

        if (doc) res.send(doc);
        else res.status(404).send('Donation doesn\'t exist!');
    });
});


router.get('/user/:id/donated', (req, res) => {
    limit = parseInt(req.query.limit) || 4
    page = parseInt(req.query.page) || 1

    const options = {
        limit: limit,
        skip: limit * (page - 1)
    }

    // locate donations with given donor id
    Donation.find({ donor: req.params.id })
        .limit(options.limit)
        .skip(options.skip)
        // skip fields to reduce size
        .populate('campaign', '-donations -comments -description -images -documents')
        .exec(function (err, docs) {
            if (err) throw err;

            // generate an array of donation ids
            donation_ids = docs.map((d) => { return mongoose.Types.ObjectId(d._id) });
            Donation.aggregate([{
                $match: {
                    _id: { "$in": donation_ids }
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
                res.json({
                    donations: docs,
                    amount: doc[0] ? doc[0].amount : 0
                });
            });
        });
});

router.get('/user/:id/donated/count', (req, res) => {
    // locate donations with given donor id
    Donation.find({ donor: req.params.id }).countDocuments(
        (err, doc) => {
            if (err) throw err;
            res.json(doc);
        });
});

router.get('/user/:id/donated/sum', (req, res) => {
    Donation.aggregate([
        {
            $match: {
                donor: new ObjectId(req.params.id) // aggregate queries require ObjectId
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
            res.json(doc[0] ? doc[0].amount : 0);
        }
    );
});

router.get('/user/:id/received', (req, res) => {
    // locate user campaigns
    Campaign.find({ owner: new ObjectId(req.params.id) }).exec((err, campaigns) => {
        if (err) res.json({ error: err, success: false });

        // generate an array of campaign ids
        const campaign_ids = campaigns.map((campaign) => {
            return mongoose.Types.ObjectId(campaign._id);
        });

        // locate donations of the user campaigns
        Donation.find({ campaign: campaign_ids })
            .populate('campaign', '-comments -donations -description -images -documents')
            .exec((err, donations) => {
                if (err) throw err;
                donations_id = donations.map((d) => { return mongoose.Types.ObjectId(d._id) });

                // calculate total amount
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
                    res.json({
                        donations: donations,
                        amount: doc[0] ? doc[0].amount : 0
                    });
                });
            });
    });
});

router.get('/user/:id/not_withdrawen', (req, res) => {
    // locate user campaigns
    Campaign.find({ owner: new ObjectId(req.params.id) }).exec((err, campaigns) => {
        if (err) throw err;

        // generate an array of campaign ids
        const campaign_ids = campaigns.map((campaign) => {
            return mongoose.Types.ObjectId(campaign._id);
        });

        Donation.find({ campaign: campaign_ids, withdrew: false })
            .populate('campaign', '-comments -donations -description -images -documents')
            .exec((err, donations) => {
                if (err) throw err;

                // generate an array of donation ids
                donations_id = donations.map((d) => { return mongoose.Types.ObjectId(d._id) });

                // calculate total amount
                Donation.aggregate([{
                    $match: {
                        _id: { "$in": donations_id },
                        status_code: 2 // success
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
                    res.json({
                        donations: donations,
                        amount: doc[0] ? doc[0].amount : 0
                    });
                });
            });
    });
});

router.post('/withdraw', passport.authenticate("jwt", { session: false }), (req, res) => {
    const donations = req.body.donations; // used for calculating the amount
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
                    _id: { "$in": donations_id },
                    status_code: 2
                    // TODO
                    // owner is user
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
                    amount: doc[0] ? doc[0].amount : 0,
                    currency: currency,
                    donations: donations_id,
                    bank_name: bank_name,
                    bank_account: bank_account,
                    payee_name: payee_name,
                    user: user
                });

                if (withdrawal.amount < payhere.minimum_withdraw) {
                    Donation.updateMany({ _id: donations }, { $set: { withdrew: false } });
                    res.status(403).send("Your balance does not exceed minimum withdrawal amount.");
                }

                withdrawal.save((err, doc) => {
                    if (err) {
                        Donation.updateMany({ _id: donations }, { $set: { withdrew: false } });
                        throw err;
                    };
                    res.send(doc);
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
        if (err) throw err;

        // if there exists an donation with given id
        // it should be updated

        if (donation.length) {
            // already exist
            Donation.findOneAndUpdate({ donation_id: new_donation.donation_id }, {
                status_code: new_donation.status_code,
                status_message: new_donation.status_message
            },
                { new: true }, (err, don) => {
                    if (err) throw err;

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
                        if (err) throw err;
                        res.status(202);
                    });
                })
        } else {
            // does not exist
            new_donation.save((err, don) => {
                if (err) throw err;
                // add into campaign using id
                Campaign.findOne({ _id: req.params.campaign_id }, (err, cmp) => {
                    cmp.complete = (cmp.raised + don.amount >= cmp.target);
                    cmp.raised += don.amount;
                    cmp.donations.push(new_donation);
                    cmp.save((err, cmp_new) => {
                        if (err) throw err;
                        res.status(202);
                    });
                });

            });
        }
    });
})

module.exports = router;