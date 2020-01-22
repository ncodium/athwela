const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const { Campaign } = require('../models/campaign');

router.get('/search/:search', (req, res) => {
    var searchby = req.params.search; // front click search get to searchby variable
    var searchTo = searchby.toLowerCase();  // convert to lowercase
    console.log(searchby);
    console.log(searchTo);
    res.send("search**");
});

module.exports = router;