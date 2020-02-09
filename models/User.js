const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number
  },
  user_type: {
    type: String
  },
  name: {
    type: String
  },

  address: {
    type: String
  },
  phonenumber: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  website: {
    type: String
  },
  reviews: {
    type: [String]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
