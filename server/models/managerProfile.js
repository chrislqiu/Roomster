const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerProfile = new Schema({
    phoneNum: Number,
    email: String,
    bio: String,
    addr: String,
    officePhone: Number
});

const managerProfileInfo = mongoose.model('managerProfileInfo', managerProfile);
module.exports = managerProfileInfo;