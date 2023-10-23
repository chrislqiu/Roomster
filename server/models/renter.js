const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RenterInfo = require('./renterInfo');

const renter = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    findingCoopmates: {
        type: Boolean,
        default: false
    },
    renterInfo: {
        type: RenterInfo.schema,
        required: true
    },
    coopmates: { //TODO: fix obj ref
        type: [RenterInfo.schema],
        default: {}
    }
});

const Renter = mongoose.model('renters', renter);
module.exports = Renter;