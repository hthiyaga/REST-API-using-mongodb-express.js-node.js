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
  softdelete: {
    type: Boolean
  }
});

module.exports = Lead = mongoose.model('lead', LeadSchema);
