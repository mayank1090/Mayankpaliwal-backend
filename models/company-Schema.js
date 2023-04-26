const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
    
  },
  company_Name: {
    type: String,
  },
  CompanyUrl: {
    type: String,
  }
});

const Companies = mongoose.model('Companies', CompanySchema);

module.exports = Companies;