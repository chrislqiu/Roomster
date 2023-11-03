const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./property');

const renterInfo = new Schema({
    name: {
        type: String,
        default: "Your Name"
    },
    age: {
        type: Number,
        default: "20"
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Intersex', 'Non-Binary', 'Agender', 'Genderfluid'],
        required: false
    },
    email: {
        type: String,
        default: "yourname@purdue.edu"
    },
    phone: {
        type: String,
        default: "(765) 123-4567"
    },
    pfp: {
        type: String,
        default: "chickenpfp"
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
                default: 23
            },
            to: {
                type: Number,
                min: 0,
                max: 23,
                default: 8
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