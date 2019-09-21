const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

var Campaign = mongoose.model('Campaign', {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    raised: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    donations: [{
        type: ObjectId,
        ref: 'Donation'
    }],
    verified: {
        type: Boolean,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    }
});

module.exports = { Campaign };