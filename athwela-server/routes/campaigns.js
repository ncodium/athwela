const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
var { Campaign } = require('../models/campaign');

router.get('/', (req, res) => {
    Campaign.find((err, docs) => {
        if (!err)
            res.json({ campaigns: docs, success: true });
        else
            res.json({ success: false, error: err })
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
        if (!err)
            res.json({ success: true, campaign: doc });
        else
            res.json({ success: false, error: err })
    });
});

router.get('/recent', (req, res) => {
    // return 10 most recent campaigns
    Campaign.find()
        .sort({ 'created_at': -1 })
        .find({ published: 'true', verified: 'true' })
        .limit(10)
        .exec((err, docs) => {
            if (!err) {
                res.send({ campaigns: docs, success: true });
            }
            else
                res.json({ success: false, error: err })
        });
});

router.get('/unpublished', (req, res) => {
    Campaign.find({ published: 'false' })
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, campaigns: doc });
            else
                res.send({ success: false, error: err });

        });
});

router.get('/published', (req, res) => {
    Campaign.find({ published: 'true' })
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, campaigns: doc });
            else
                res.send({ success: false, error: err });
        });
});

router.get('/verified', (req, res) => {
    Campaign.find({ verified: 'true' })
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, campaigns: doc });
            else
                res.send({ success: false, error: err });
        });
});


router.get('/unverified', (req, res) => {
    Campaign.find({ 'verified': false })
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, campaigns: doc });
            else
                res.send({ success: false, error: err });
        });
});


router.get('/categories', (req, res) => {
    Campaign.distinct('category')
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, categories: doc });
            else
                res.send({ success: false, error: err });
        });
});

// router.get('/categories/:category', (req,res) => {

// });

router.get('/user', passport.authenticate("jwt", { session: false }), (req, res) => {
    Campaign.find({
        'owner': new ObjectId(req.user._id)
    }).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/user/:id', (req, res) => {
    Campaign.find({
        'owner': new ObjectId(req.params.id)
    }).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/:id', (req, res) => {
    // locate user with given id
    if (!ObjectId.isValid(req.params.id))
        return res.json({ success: false });

    Campaign.findById(req.params.id)
        .populate('owner', '-password')
        .populate('verified_by', '-password')
        .populate('comments.owner', '-password')
        .exec(function (err, doc) {
            if (!err)
                res.send({ success: true, campaign: doc });
            else
                res.send({ success: false, error: err });
        });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.send({ success: false, msg: `No campaign exist with given Id: ${req.params.id}` });

    const cmp = {
        name: req.body.name,
        description: req.body.description,
        target: req.body.target,
        deadline: req.body.deadline
    };

    Campaign.findByIdAndUpdate(
        req.params.id,
        { $set: cmp },
        { new: true },
        (err, doc) => {
            if (!err)
                res.send({ success: true, campaign: doc });
            else
                res.send({ success: false, error: err });
        });
});

router.put('/:id/verify', passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndUpdate(req.params.id, {
        $set: {
            verified: 'true',
            verified_by: req.user._id
        }
    },
        { new: true }, (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
            }
        });
});

router.put('/:id/unverify', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndUpdate(req.params.id, { $set: { verified: 'false' } }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id/publish', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndUpdate(req.params.id, { $set: { published: 'true' } }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id/unpublish', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndUpdate(req.params.id, { $set: { published: 'false' } }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/:id/comment', passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No campaign with given Id: ${req.params.id}`);

    if (!req.body.body)
        return res.status(400).send(`No body in comment`);

    const comment = {
        owner: req.user._id,
        body: req.body.body
    }

    Campaign.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id/comment/:commentId', passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No campaign with given Id: ${req.params.id}`);
    if (!ObjectId.isValid(req.params.commentId))
        return res.status(400).send(`No campaign with given Id: ${req.params.commentId}`);

    Campaign.findByIdAndUpdate(req.params.id, {
        $pull: {
            comments: { _id: req.params.commentId }
        }
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.send({ success: false, msg: `No campaign exist with given Id: ${req.params.id}` });

    Campaign.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            res.send({ success: false, error: err });
        }
    });
});

module.exports = router;