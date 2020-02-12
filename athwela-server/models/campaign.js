const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const { donationSchema } = require('./donation');

const campaignSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        owner: { type: ObjectId, ref: 'User', required: true },
        target: { type: Number, required: true },
        raised: { type: Number, default: 0 },
        status: { type: Number, default: 0 },
        deadline: { type: Date, required: true },
        verified: { type: Boolean, default: false },
        rejected: { type: Boolean, default: false },
        reject_message: { type: String, required: false },
        published: { type: Boolean, default: false },
        complete: { type: Boolean, default: false },
        comments: [{
            owner: { type: ObjectId, ref: 'User', required: true },
            body: { type: String, required: true }
        }],
        verified_by: { type: ObjectId, ref: 'User', required: false },
        donations: [donationSchema]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = { Campaign };