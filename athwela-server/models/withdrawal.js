const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const { Campaign } = require('./campaign');
const { User } = require('./user');
const { Donation } = require('./donation');

// status codes
// 0 pending
// 1 approved
// 2 declined

const withdrawalSchema = new Schema(
    {
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        donations: [{ type: ObjectId, ref: 'Donation', required: true }],
        status_code: { type: Number, required: true, default: 0 },
        status_message: { type: String, required: false, default: 'pending' },
        bank_name: { type: String, required: true },
        bank_account: { type: String, required: true },
        payee_name: { type: String, required: true },
        user: { type: ObjectId, ref: 'User', required: true } //owner
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);
module.exports = { Withdrawal, withdrawalSchema };