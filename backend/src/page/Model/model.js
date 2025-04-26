
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employeeId: { type: String, required: true },
  eta: { type: Date, required: true },
  image: { type: String },
  project: { type: String, required: true },
});

const workItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  employee: {
    type: String,
    required: true,
  },
  eta: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['NeedToDo', 'InProgress', 'NeedForTest', 'Completed', 'Reopen'],
    required: true,
  },
}, { timestamps: true });

const WorkItem = mongoose.model('WorkItem', workItemSchema);


const Employee = mongoose.model('Employee', employeeSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = { Employee, Task ,WorkItem};
