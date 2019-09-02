const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Campaign } = require('../models/campaigns');

//retrive router
router.get('/', (req, res) => {
    Campaign.find((err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log('Error in retrieving data: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    Campaign.findById(req.params.id, (err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var cmp = new Campaign({
        name: req.body.name,
        description: req.body.description,
        target: req.body.target,
        deadline: req.body.deadline
    });
    cmp.save((err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in saving data: ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;