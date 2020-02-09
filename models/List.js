const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  year: {
    type: Number
  },
  make: {
    type: String
  },
  model: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  vehicletype: {
    type: String
  },

  meta: {
    color: {
      type: String
    },
    transmission: {
      type: String
    }
  },
  images: [
    {
      url: { type: String },
      name: { type: String }
    }
  ],
  user_id: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = List = mongoose.model('list', ListSchema);
