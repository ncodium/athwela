const express = require('express');
const router = express.Router();
const passport = require('passport');

var ObjectId = require('mongoose').Types.ObjectId;
var { Campaign } = require('../models/campaign');

//retrive router
router.get('/', (req, res) => {
    Campaign.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving data: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);
    Campaign.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    var cmp = new Campaign({
        name: req.body.name,
        description: req.body.description,
        owner: ObjectId(req.user._id),
        target: req.body.target,
        raised: 0,
        deadline: req.body.deadline,
        verified: false,
        published: false
    });
    cmp.save((err, doc) => {
        if (!err) {
            res.json({ success: true, msg: 'Campaign created', campaign: doc });
        }
        else { console.log('Error in saving data: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    var cmp = {
        name: req.body.name,
        description: req.body.description,
        target: req.body.target,
        deadline: req.body.deadline
    };
    Campaign.findByIdAndUpdate(req.params.id, { $set: cmp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in deleting campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;