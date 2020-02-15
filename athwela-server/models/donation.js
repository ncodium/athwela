const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId
const { Campaign } = require('./campaign');
const { User } = require('./user');

const donationSchema = new Schema(
    {
        donation_id: { type: String, required: true },
        payment_id: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status_code: { type: Number, required: true },
        status_message: { type: String, required: true },
        method: { type: String, required: true },
        donor: { type: ObjectId, ref: 'User', required: false },
        campaign: { type: ObjectId, ref: 'Campaign', required: false },
        withdrew: { type: Boolean, default: false, required: true }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

donationSchema.plugin(aggregatePaginate);
donationSchema.plugin(mongoosePaginate);

const Donation = mongoose.model('Donation', donationSchema);
const currency = 'LKR';

module.exports = { Donation, donationSchema, currency };