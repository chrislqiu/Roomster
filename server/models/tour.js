const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tour = new Schema({
    username: {
        type: String,
        require: true
    },
    propertyName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    }
});

const Tour = mongoose.model('tours', tour);
module.exports = Tour;