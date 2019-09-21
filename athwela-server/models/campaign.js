const mongoose = require('mongoose');
const ObjectId = Schema.Types.ObjectId

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
    date: {
        type: Date,
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
    raised: {
        type: Number,
        required: true
    },
    target: {
        type: Number,
        required: True
    },
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