const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const renterProfile = new Schema({
    profilePic: String,
    purdueEmail: String,
    phone: Number,
    pets: Boolean,
    smoke: Boolean,
    studious: Number,
    cleanliness: Number,
    guestFreq: Number,
    sleep: String,
    looking: Boolean
})

const renterProfileInfo = mongoose.model('renterProfileInfo', renterProfile);
module.exports = renterProfileInfo;