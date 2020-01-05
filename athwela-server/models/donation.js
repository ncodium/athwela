const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
var { Campaign } = require('./campaign');
var { User } = require('./user');

var Donation = new Schema(
    {
        _id: { type: String, required: true },
        payment_id: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status_code: { type: Number, required: true },
        status_message: { type: String, required: true },
        method: { type: String, required: true },
        owner: { type: ObjectId, ref: 'User', required: true },
        campaign: { type: ObjectId, ref: 'Campaign', required: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = { Donation };