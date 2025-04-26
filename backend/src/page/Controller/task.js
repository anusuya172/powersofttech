const Task = require('../Model/model').Task;

exports.getTasks = async (req, res) => {
  try {
    const { project } = req.query; 
    const tasks = project ? await Task.find({ project }) : await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, employeeId, eta, image, project } = req.body;
    const newTask = new Task({ 
      title, 
      description, 
      employeeId, 
      eta: new Date(eta), 
      image, 
      project 
    });
        await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};
