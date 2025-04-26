const express = require('express');
const { getWorkItems, createWorkItem, updateWorkItem, deleteWorkItem } = require('../Controller/dashboard');

const app = express.Router();
app.get('/workitems', getWorkItems);
app.post('/workitems', createWorkItem);
app.put('/workitems:id', updateWorkItem);
app.delete('/workitems:id', deleteWorkItem);

module.exports = app;
