const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const { Campaign } = require('../models/campaign');

// Count search results
router.get('/campaigns/:search/count', (req, res) => {
    var searchby = req.params.search;           // search string get to searchby variable
    var searchTo = searchby.toLowerCase();      // convert to lowercase

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 9;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ name: { $regex:searchTo , $options: "i" } }).count((err, count) => {   // get search count
        if (!err) {
            res.send({ success: true, campaignsCount: count });
        } else {
            res.send({ success: false, error: err });
        }
    });
});

// find search results
router.get('/campaigns/:search', (req, res) => {
    var searchby = req.params.search; // search string get to searchby variable
    var searchTo = searchby.toLowerCase();  // convert to lowercase

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 9;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ name: { $regex:searchTo ,$options: "i" } }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {       //   Like comand in mongoose { $regex: '.*' + searchTo + '.*' }
        if (!err) {
            res.send({ success: true, campaigns: doc });
        } else {
            res.send({ success: false, error: err });
        }
    });
});

module.exports = router;