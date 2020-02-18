const express = require('express');
const async = require('async');
const router = express.Router();
const { getDateMinusTwoYears } = require('../helpers/datehelper');
const { Campaign } = require('../models/campaign');
const { Donation } = require('../models/donation');
const { User } = require('../models/user');

// moderator dashboard stats
router.get('/count', (req, res) => {
    // define functions
    // execute them asynchrounously

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
        User.find({ role: 'user' }).countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countModerators = function (callback) {
        User.find({ role: 'mod' }).countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    // parallely calculate counts and send response 
    async.parallel([countCampaigns, countDonations, countUsers, countModerators],
        function (err, results) {
            // err contains the array of error of all the functions
            // results contains an array of all the results
            // results[0] contains results of first function

            res.send({
                campaigns: results[0],
                donations: results[1],
                users: results[2],
                moderators: results[3]
            });
        });
});

router.get('/category-count', (req, res) => {
    // group by category
    // calculate number of items 
    Campaign.aggregate([
        {
            // process documents created within last two years 
            $match: {
                created_at: {
                    $gte: getDateMinusTwoYears(),
                }
            }
        }, {
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
    // group by status
    // calculate number of items
    Campaign.aggregate([
        {
            // process documents created within last two years 
            $match: {
                created_at: {
                    $gte: getDateMinusTwoYears(),
                }
            }
        }, {
            $group: {
                // generates four groups for each distinct values of the _id
                // verified: false, published: false
                // verified: false, published: true
                // verified: true, published: false
                // verified: true, published true
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
    // group by category
    // calculate number of items
    Campaign.aggregate([
        {
            // process documents created within last two years 
            $match: {
                created_at: {
                    $gte: getDateMinusTwoYears(),
                }
            }
        }, {
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
        res.send(doc);
    });
});

router.get('/monthly-donations', (req, res) => {
    // group by category
    // calculate number of items
    Donation.aggregate([
        {
            // process documents created within last two years 
            $match: {
                created_at: {
                    $gte: getDateMinusTwoYears(),
                }
            }
        }, {
            $group: {
                _id: {
                    month: { $month: "$created_at" },
                    year: { $year: "$created_at" },

                },
                total: { $sum: "$amount" },
                count: { $sum: 1 }
            },
        }
    ]).exec((err, doc) => {
        console.log(doc);
        if (err) throw err;
        res.json(doc);
    });
});

module.exports = router;