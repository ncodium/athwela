const express = require('express');
const router = express.Router();
const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const { Campaign } = require('../models/campaign');

router.get('/', (req, res) => {

    Campaign.find((err, docs) => {
        if (!err)
            res.json({ campaigns: docs, success: true });
        else
            res.json({ success: false, error: err })
    });
});

router.get('/pagination', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 9;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find().skip((page - 1) * pagination).limit(pagination).exec((err, docs) => {
        if (!err)
            res.json({ campaigns: docs, success: true });
        else
            res.json({ success: false, error: err })
    });
});

router.get('/pagination/count', (req, res) => {

    Campaign.find().countDocuments((err, count) => {
        if (!err)
            res.json({ campaignsCount: count, success: true });
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
        category: req.body.category,
        images: req.body.images,
        documents: req.body.documents
    });

    cmp.save((err, doc) => {
        if (!err)
            res.json({ success: true, campaign: doc });
        else
            res.json({ success: false, error: err })
    });
});

router.get('/recent', (req, res) => {
    // return 9 most recent campaigns
    Campaign.find()
        .sort({ 'created_at': -1 })
        .find({ published: 'true', verified: 'true' })
        .limit(9)
        .exec((err, docs) => {
            if (!err) {
                res.send({ campaigns: docs, success: true });
            }
            else
                res.json({ success: false, error: err })
        });
});

router.get('/unpublished', (req, res) => {
    Campaign.find({ published: 'false' }, (err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/unpublished/pagination', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ published: 'false' }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/unpublished/count', (req, res) => {
    Campaign.find({ published: 'false' }).countDocuments((err, count) => {
        if (!err)
            res.send({ success: true, unpublishedCount: count });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/published', (req, res) => {

    Campaign.find({ published: 'true' }).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/published/pagination', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ published: 'true' }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/published/count', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ published: 'true' }).countDocuments((err, count) => {
        if (!err)
            res.send({ success: true, categoriesCount: count });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/verified', (req, res) => {
    Campaign.find({ verified: 'true' }, (err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/verified/pagination', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 9;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ verified: 'true' }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/verified/count', (req, res) => {

    Campaign.find().countDocuments((err, count) => {
        if (!err)
            res.json({ verifiedCount: count, success: true });
        else
            res.json({ success: false, error: err })
    });
});

router.get('/unverified', (req, res) => {
    Campaign.find({ 'verified': false }, (err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/unverified/pagination', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 9;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({ 'verified': false }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/unverified/count', (req, res) => {
    Campaign.find({ 'verified': false }).countDocuments((err, count) => {
        if (!err)
            res.send({ success: true, unverifiedCount: count });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/categories', (req, res) => {
    Campaign.distinct('category').exec((err, doc) => {
        if (!err)
            res.send({ success: true, categories: doc });
        else
            res.send({ success: false, error: err });
    });
});

// filter campaigns by category
router.get('/categories/:category', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({
        'category': req.params.category,
        'verified': true,
        'published': true
    }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/categories/:category/count', (req, res) => {

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    Campaign.find({
        'category': req.params.category,
        'verified': true,
        'published': true
    }).countDocuments((err, count) => {
        if (!err)
            res.send({ success: true, categoriesCount: count });
        else
            res.send({ success: false, error: err });
    });

});


// count sort data
router.get('/sort/:sort/count', (req, res) => {
    var sortby = req.params.sort; // front click sort get to sortby variable
    var sortTo = sortby.toLowerCase();  // convert to lowercase

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    // sort by date
    if (sortTo == "date") {
        Campaign.find().sort({ "deadline": -1 }).countDocuments((err, count) => {
            if (!err) {
                res.send({ success: true, sortCount: count });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by name
    else if (sortTo == "name") {
        Campaign.find().sort({ [sortTo]: -1 }).countDocuments((err, count) => {
            if (!err) {
                res.send({ success: true, sortCount: count });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by donations
    else if (sortTo == "donations") {
        Campaign.find().sort({ [sortTo]: -1 }).countDocuments((err, count) => {
            if (!err) {
                res.send({ success: true, sortCount: count });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by comments
    else if (sortTo == "comments") {
        Campaign.find().sort({ [sortTo]: -1 }).countDocuments((err, count) => {
            if (!err) {
                res.send({ success: true, sortCount: count });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by trending
    else if (sortTo == "trending") {
        Campaign.find().sort({ "deadline": -1, "comments": -1 }).countDocuments((err, count) => {
            if (!err) {
                res.send({ success: true, sortCount: count });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

});

// sort campaigns
router.get('/sort/:sort', (req, res) => {
    var sortby = req.params.sort; // front click sort get to sortby variable
    var sortTo = sortby.toLowerCase();  // convert to lowercase

    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 4;    // use to pagination, skip & limit queries use for it
    const page = req.query.page ? parseInt(req.query.page) : 1;

    // sort by date
    if (sortTo == "date") {
        Campaign.find().sort({ "deadline": -1 }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
            if (!err) {
                res.send({ success: true, campaigns: doc });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by name
    else if (sortTo == "name") {
        Campaign.find().sort({ [sortTo]: -1 }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
            if (!err) {
                res.send({ success: true, campaigns: doc });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by donations
    else if (sortTo == "donations") {
        Campaign.find().sort({ [sortTo]: -1 }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
            if (!err) {
                res.send({ success: true, campaigns: doc });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by comments
    else if (sortTo == "comments") {
        Campaign.find().sort({ [sortTo]: -1 }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
            if (!err) {
                res.send({ success: true, campaigns: doc });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

    // sort by trending
    else if (sortTo == "trending") {
        Campaign.find().sort({ "deadline": -1, "comments": -1 }).skip((page - 1) * pagination).limit(pagination).exec((err, doc) => {
            if (!err) {
                res.send({ success: true, campaigns: doc });
            } else {
                res.send({ success: false, error: err });
            }
        });
    }

});

router.get('/user', passport.authenticate("jwt", { session: false }), (req, res) => {
    Campaign.find({ 'owner': new ObjectId(req.user._id) }, (err, doc) => {
        if (!err)
            res.send({ success: true, campaigns: doc });
        else
            res.send({ success: false, error: err });
    });
});

router.get('/user/:id/count', (req, res) => {
    Campaign.find({ 'owner': new ObjectId(req.params.id) })
        .countDocuments((err, doc) => {
            if (!err)
                res.send({ success: true, count: doc });
            else
                res.send({ success: false, error: err });
        });
});

router.get('/user/:id', (req, res) => {
    limit = parseInt(req.query.limit) || 4
    page = parseInt(req.query.page) || 1

    const options = {
        limit: limit,
        skip: limit * (page - 1)
    }

    Campaign.find({ 'owner': new ObjectId(req.params.id) })
        .limit(options.limit)
        .skip(options.skip)
        .exec((err, doc) => {
            if (!err)
                res.send({ success: true, campaigns: doc });
            else
                res.send({ success: false, error: err });
        });
});



//report generation
router.get('/date/:start/:end', (req, res) => {
    Campaign.find({
        created_at: {
            $gte: new Date(new Date(req.params.start).setHours(00, 00, 00)),
            $lt: new Date(new Date(req.params.end).setHours(23, 59, 59))
        }
    }).sort({ created_at: 'asc' }).populate('owner').
        exec((err, docs) => {
            if (err) throw err;
            res.send(docs)
        });
})

router.get('/:id', (req, res) => {
    // validate if user exists
    if (!ObjectId.isValid(req.params.id))
        return res.json({ success: false });

    Campaign.findById(req.params.id)
        .populate('owner', '-password')
        .populate('verified_by', '-password')
        .populate('comments.owner', '-password')
        .populate('donations.donor', '-password')
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

router.put('/:id/reject', passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndUpdate(req.params.id, {
        $set: {
            rejected: 'true',
            reject_message: req.body.reject_message
        }
    },
        { new: true }, (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log('Error in updating campaign: ' + JSON.stringify(err, undefined, 2));
            }
        }
    );
});

router.put('/:id/unreject', passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    Campaign.findByIdAndUpdate(req.params.id, {
        $set: {
            rejected: 'false',
            reject_message: ''
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

// total count
router.get('/count', (req, res) => {
    Campaign.countDocuments({}, (err, count) => {
        res.json({ count: count })
    })
});

// approved count
router.get('/approvedcount', (req, res) => {
    Campaign.find({ published: 'true' }).countDocuments({}, (err, count) => {
        res.json({ count: count })
    })
});


module.exports = router;