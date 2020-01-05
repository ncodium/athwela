const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const { Campaign } = require('./campaign');
const { User } = require('./user');

const donationSchema = new Schema(
    {
        _id: { type: String, required: true },
        payment_id: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status_code: { type: Number, required: true },
        status_message: { type: String, required: true },
        method: { type: String, required: true },
        owner: { type: ObjectId, ref: 'User', required: false },
        campaign: { type: ObjectId, ref: 'Campaign', required: false },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = { Donation, donationSchema };