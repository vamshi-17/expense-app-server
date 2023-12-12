const Budget = require('../models/budget')

const createBudget = async (req, res) => {
  try {
    const {  category, amount,year, month } = req.body;
    const user = req.user._id;

    // Create and save the new budget
    const newBudget = new Budget({ user, category, amount});
    await newBudget.save();

    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Create Budget Error:', error);
    res.status(500).json({ error: 'Error creating new budget.' });
  }
};
  
const getBudgets = async (req, res) => {
  try {
    const user = req.user._id;
    const budgets = await Budget.find({ user });

    res.status(200).json(budgets);
  } catch (error) {
    console.error('Get Budgets Error:', error);
    res.status(500).json({ error: 'Error retrieving budgets.' });
  }
};
  
const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error('Get Budget By ID Error:', error);
    res.status(500).json({ error: 'Error retrieving budget.' });
  }
};
  
const updateBudget = async (req, res) => {
  try {
    const { user, category, amount } = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      { user, category, amount },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error('Update Budget Error:', error);
    res.status(500).json({ error: 'Error updating budget.' });
  }
};
  
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndRemove(req.params.id);

    if (!deletedBudget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.status(204).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete Budget Error:', error);
    res.status(500).json({ error: 'Error deleting budget.' });
  }
};
  
module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
  