const express = require('express');
const app = express.Router();
const taskController = require("../Controller/task");

app.get('/tasks', taskController.getTasks);

app.post('/tasks', taskController.createTask);

app.put('/tasks/:id', taskController.updateTask);

app.delete('/tasks/:id', taskController.deleteTask);

module.exports = app;
