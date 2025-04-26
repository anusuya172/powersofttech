const express = require('express');
const app = express.Router();
const employee = require("../Controller/empdata");

app.get('/empdata', employee.getEmployees);
app.post('/empdata', employee.createEmployee);
app.put('/empdata/:id', employee.updateEmployee); 
app.delete('/empdata/:id', employee.deleteEmployee);

module.exports = app;
