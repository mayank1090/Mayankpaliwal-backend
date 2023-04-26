const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },

  company_Name:{
    type:String
  },
  primaryText: {
    type: String,
  },
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Ad = mongoose.model('companyName', adSchema);

module.exports = Ad;