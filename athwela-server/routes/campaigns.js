const express = require('express');
const router = express.Router();
const passport = require('passport');

const ObjectId = require('mongoose').Types.ObjectId;
var { Campaign } = require('../models/campaign');

// TODO
// Handle CRUD operation error messages

router.get('/', (req, res) => {
    Campaign.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving data: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    const cmp = new Campaign({
        name: req.body.name,
        description: req.body.description.trim(),
        owner: req.user._id,
        target: req.body.target,
        deadline: req.body.deadline,
        category: req.body.category
    });
    cmp.save((err, doc) => {
        if (!err) {
            res.json(doc._id);
        }
        else { console.log('Error: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/recent', (req, res) => {
    Campaign.find().sort({ 'created_at': -1 }).limit(6).exec((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/unpublished', (req, res) => {
    Campaign.find({ 'published': false }).exec((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }

    });

});

router.get('/published', (req, res) => {
    Campaign.find({ published: 'true' }).exec((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/verified', (req, res) => {
    Campaign.find({ 'verified': 'true' }).exec((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }

    });
});

router.get('/unverified', (req, res) => {
    Campaign.find({ verified: 'false' }).exec((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);
    Campaign.findById(req.params.id).populate('owner', '-password').exec(function (err, doc) {
        if (!err) {
            // TODO
            // Check if doc is null
            res.send(doc);
        }
        else { console.log('Error in retrieving campaign: ' + JSON.stringify(err, undefined, 2)); }
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
router.put('/:id/verify', (req, res) => {
    // TODO
    // Protect endpoint so that only owner or administrator may edit

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);
 

    Campaign.findByIdAndUpdate(req.params.id, { $set: {verified:'true'} }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/:id/publish', (req, res) => {
    // TODO
    // Protect endpoint so that only owner or administrator may edit

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

     

    Campaign.findByIdAndUpdate(req.params.id, { $set: {published:'true'} }, { new: true }, (err, doc) => {
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