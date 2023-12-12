const mongoose = require('mongoose');

// Define the schema for budge
const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Create a model based on the schema
const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;