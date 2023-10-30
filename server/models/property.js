const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PropertyInfo = require('./propertyInfo');
const CompanyInfo = require('./companyInfo');

const property = new Schema({
    propertyInfo: {
        type: PropertyInfo.schema,
        require: false
    },
    companyInfo: {
        type: CompanyInfo.schema,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }   
});

const Property = mongoose.model('properties', property);
module.exports = Property;