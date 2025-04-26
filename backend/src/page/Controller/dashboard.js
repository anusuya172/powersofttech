const WorkItem = require('../Model/model').WorkItem;


const getWorkItems = async (req, res) => {
  try {
    const workItems = await WorkItem.find();
    res.json(workItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWorkItem = async (req, res) => {
  try {
    const workItem = new WorkItem(req.body);
    await workItem.save();
    res.status(201).json(workItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateWorkItem = async (req, res) => {
  try {
    const updatedWorkItem = await WorkItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorkItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteWorkItem = async (req, res) => {
  try {
    await WorkItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Work Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getWorkItems,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
};
