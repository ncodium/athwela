const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId
var { Donation } = require('./donation');

var Campaign = mongoose.model('Campaign', new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        owner: { type: ObjectId, ref: 'User', required: true },
        target: { type: Number, required: true },
        raised: { type: Number, default: 0 },
        deadline: { type: Date, required: true },
        //donations: [{ type: Donation, required: false }],
        verified: { type: Boolean, default: false },
        published: { type: Boolean, default: false },
        comments: [{
            owner: { type: ObjectId, ref: 'User', required: true },
            body: { type: String, required: true }
        }],
        verified_by: { type: ObjectId, ref: 'User', required: false }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
));

module.exports = { Campaign };