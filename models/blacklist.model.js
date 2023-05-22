const mongoose = require('mongoose');

const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const BlackListModel = mongoose.model('Blacklist', BlacklistSchema);
module.exports={BlackListModel}