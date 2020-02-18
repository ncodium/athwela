const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const { Donation, currency } = require('../models/donation');
const { Withdrawal } = require('../models/withdrawal');
const appconfig = require('../config/appconfig');

router.get('/', (req, res) => {
    // return all withdrawal requests
    Withdrawal.find()
        .populate({
            path: 'donations',
            populate: { path: 'campaign', select: '_id name' }
        })
        .populate('user', '-password').exec((err, doc) => {
            // except password
            if (err) throw err;
            res.send(doc)
        });
});

router.get('/user/:id', (req, res) => {
    // uses default values if query parameters doesn't exist
    const opts = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }

    Withdrawal.find({ user: req.params.id })
        .skip(opts.page * opts.limit)
        .limit(opts.limit)
        .populate({
            path: 'donations',
            populate: { path: 'campaign', select: '_id name' } // only name and _id
        })
        .exec((err, doc) => {
            if (err) throw err;
            res.send(doc);
        });
});


router.get('/:id', (req, res) => {
    // locate donation with given id
    Withdrawal.findOne({ _id: req.params.id }, (err, doc) => {
        if (err) throw err;
        res.send(doc);
    });
});

router.put('/:id/approve', (req, res) => {
    // set status as approved
    // 0 pending
    // 1 approved
    // 2 declined
    Withdrawal.findByIdAndUpdate(req.params.id,
        {
            $set: {
                status_code: 1, // approved
                status_message: 'approved'
            }
        },
        { new: true }, (err, doc) => {
            if (err) throw err;
            res.send(doc);
        });
});

router.put('/:id/reject', (req, res) => {
    // set status as approved
    // 0 pending
    // 1 approved
    // 2 declined
    Withdrawal.findByIdAndUpdate(req.params.id,
        {
            $set: {
                status_code: 2, // rejected
                // if status_message doesn't exist, set as rejected
                status_message: req.body.status_message ? req.body.status_message : 'rejected'
            }
        },
        { new: true }, (err, doc) => {
            if (err) throw err;

            // reset donations withdrew status to false
            Donation.updateMany(
                { _id: { $in: doc.donations } },
                { withdrew: false },
                { multi: true },
                (err, don) => {
                    console.log(don);
                    if (err) throw err;
                    res.send(doc);
                });

        }
    );
});


module.exports = router;