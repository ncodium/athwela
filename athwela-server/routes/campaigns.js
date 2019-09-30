const express = require('express');
const router = express.Router();
const passport = require('passport');

const ObjectId = require('mongoose').Types.ObjectId;
const { Campaign } = require('../models/campaign');
const { User } = require('../models/user');


// TODO
// Handle CRUD operation error messages

router.get('/', (req, res) => {
    Campaign.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving data: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);
    Campaign.findById(req.params.id).populate('owner').exec(function (err, doc) {
        if (!err) {
            // TODO
            // Check if doc is null

            res.send(doc);
        }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    const cmp = new Campaign({
        name: req.body.name,
        description: req.body.description,
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
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
    // TODO
    // Protect endpoint so that only owner or administrator may edit

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    const cmp = {
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
    // TODO
    // Protect endpoint so that only owner or administrator may delete

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in deleting campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;