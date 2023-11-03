const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyInfo = new Schema({
    name: {
      type: String,
      default: "Your Company Name"
    },
    address: {
      type: String,
      default: "Your Company Address"
    },
    site: {
      type: String,
      default: "yourcompanysite.com"
    },
    email: {
      type: String,
      default: "info@yourcompanyname.com"
    },
    phone: {
      type: String,
      default: "(765) 123-4567"
    }
});

const CompanyInfo = mongoose.model('companyinfo', companyInfo);
module.exports = CompanyInfo;