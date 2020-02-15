const express = require('express');
const async = require('async');
const router = express.Router();
const { Campaign } = require('../models/campaign');
const { Donation } = require('../models/donation');
const { User } = require('../models/user');

router.get('/count', (req, res) => {
    var countCampaigns = function (callback) {
        Campaign.countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countDonations = function (callback) {
        Donation.countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countUsers = function (callback) {
        User.User.find({ role: 'user' }).countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countModerators = function (callback) {
        User.User.find({ role: 'mod' }).countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    // parallely calculate counts and send response 
    async.parallel([countCampaigns, countDonations, countUsers, countModerators], function (err, results) {
        // err contains the array of error of all the functions
        // results contains an array of all the results

        res.send({
            campaigns: results[0],
            donations: results[1],
            users: results[2],
            moderators: results[3]
        });
    });
});

router.get('/category-count', (req, res) => {
    Campaign.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ]).exec((err, doc) => {
        if (err) throw err;
        res.send(doc);
    });
});

router.get('/status-count', (req, res) => {
    Campaign.aggregate([
        {
            $group: {
                _id: {
                    verified: "$verified",
                    published: "$published"
                },
                count: { $sum: 1 }
            }
        }
    ]).exec((err, doc) => {
        if (err) throw err;
        res.send(doc);
    });
});

router.get('/monthly-count', (req, res) => {
    Campaign.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$created_at" },
                    year: { $year: "$created_at" }
                },
                count: { $sum: 1 }
            }
        }
    ]).exec((err, doc) => {
        if (err) throw err;
        // console.log(doc);
        res.send(doc);
    });
});

router.get('/monthly-donations', (req, res) => {
    Donation.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$created_at" },
                    year: { $year: "$created_at" },

                },
                total: { $sum: "$amount" }
            },
        }
    ]).exec((err, doc) => {
        if (err) throw err;
        res.send(doc);
    });
});

module.exports = router;