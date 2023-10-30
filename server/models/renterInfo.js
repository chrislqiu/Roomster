const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./property');

const renterInfo = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
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
        required: false
    },
    pfp: {
        type: String,
        default: "og pfp"
    },
    livingPreferences: {
        pets: {
            type: Boolean,
            default: null
        },
        smoke: {
            type: Boolean,
            default: null
        },
        studious: {
            type: Number,
            min: 0,
            max: 5
        },
        cleanliness: {
            type: Number,
            min: 0,
            max: 5
        },
        guestFreq: {
            type: Number,
            min: 0,
            max: 5
        },
        sleepSchedule: {
            asleep: {
                type: Number,
                min: 0,
                max: 23
            },
            awake: {
                type: Number,
                min: 0,
                max: 23
            }
        }
    },
    favCoops: {
        type: [Property.schema],
        required: false
    }
});

const RenterInfo = mongoose.model('renterinfo', renterInfo);
module.exports = RenterInfo;