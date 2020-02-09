const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  vehicle_id: {
    type: String
  },
  name: {
    type: String
  },
  phonenumber: {
    type: Number
  },

  email: {
    type: String
  },
  comments: {
    type: String
  },
  status: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lead = mongoose.model('lead', LeadSchema);
