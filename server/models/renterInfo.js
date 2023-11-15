const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./property');

const renterInfo = new Schema({
    name: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false,
        default: 20
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Intersex', 'Non-Binary', 'Agender', 'Genderfluid'],
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: "Phone Number"
    },
    pfp: {
        type: String,
        default: ''
    },
    livingPreferences: {
        pets: {
            type: Boolean,
            default: false
        },
        smoke: {
            type: Boolean,
            default: false
        },
        studious: {
            type: Number,
            min: 0,
            max: 5,
            default: 3
        },
        cleanliness: {
            type: Number,
            min: 0,
            max: 5,
            default: 3
        },
        guestFreq: {
            type: Number,
            min: 0,
            max: 5,
            default: 3
        },
        sleepSchedule: {
            from: {
                type: Number,
                min: 0,
                max: 23,
                default: 0
            },
            to: {
                type: Number,
                min: 0,
                max: 23,
                default: 0
            }
        },
    },
    favCoops: {
        type: [Property.schema],
        required: false
    }
});

const RenterInfo = mongoose.model('renterinfo', renterInfo);
module.exports = RenterInfo;