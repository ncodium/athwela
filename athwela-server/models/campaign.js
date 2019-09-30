const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

// TODO
// For whom, category

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
        default: 0
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
        default: false
    },
    published: {
        type: Boolean,
        default: false
    }
});

module.exports = { Campaign };