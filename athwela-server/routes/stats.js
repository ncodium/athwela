const express = require('express');
const async = require('async');
const router = express.Router();
const { Campaign } = require('../models/campaign');
const { Donation } = require('../models/donation');
const { User } = require('../models/user');

router.get('/count', (req, res) => {
    console.log('im called boyy');
    var countCampaigns = function (callback) {
        Campaign.countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countDonations = function (callback) {
        Campaign.countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countUsers = function (callback) {
        User.countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    var countModerators = function (callback) {
        User.countDocuments({}, (err, count) => {
            if (err) { callback(err, null) }
            else {
                callback(null, count);
            }
        });
    };

    async.parallel([countCampaigns, countDonations, countUsers, countModerators], function (err, results) {
        //err contains the array of error of all the functions
        //results contains an array of all the results
        //results[0] will contain value of doc.length from countQuery function
        //results[1] will contain doc of retrieveQuery function
        //You can send the results as
        console.log(results)
        res.send({ results });

    });


});

module.exports = router;