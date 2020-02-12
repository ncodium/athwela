const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const { Campaign } = require('../models/campaign');

router.get('/campaigns/:search', (req, res) => {
    var searchby = req.params.search; // front click search get to searchby variable
    var searchTo = searchby.toLowerCase();  // convert to lowercase

    Campaign.find({name: { $regex: '.*' + searchTo + '.*' } }).exec((err, doc) => {       //   Like comand in mongoose { $regex: '.*' + searchTo + '.*' }
            if (!err) {
                res.send({ success: true, campaigns: doc });
            } else {
                res.send({ success: false, error: err });
            }
        });

});

module.exports = router;