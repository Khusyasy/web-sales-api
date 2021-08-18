const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  service: String,
  total: Number,
  transactionDate: Date,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},{
  timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);