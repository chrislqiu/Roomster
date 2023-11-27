const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PropertyInfo = require('./propertyInfo');
const CompanyInfo = require('./companyInfo');
const Tour = require('./tour')

const company = new Schema({
    companyInfo: {
        type: CompanyInfo.schema,
        required: true
    },
    myCoops: {
        type: [PropertyInfo.schema],
        required: false
    },
    tours: {
        type: [Tour.schema],
        required: false
    }
});

const Company = mongoose.model('companies', company);
module.exports = Company;