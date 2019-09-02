const mongoose = require('mongoose');

var Campaign = mongoose.model('Campaign', {
    name: { type: String },
    description: { type: String },
    target: { type: Number },
    deadline: { type: Date }
});

module.exports = { Campaign };