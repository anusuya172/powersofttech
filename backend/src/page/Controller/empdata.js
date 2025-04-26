const Employee = require('../Model/model').Employee; 

const createEmployee = async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const employee = new Employee({
      employeeName: req.body.employeeName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
      address: req.body.address,
    });

    console.log('Employee Object:', employee);

    await employee.save();

    res.status(200).json({ message: 'Employee data submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getEmployees = async (req, res) => {
    try {
      const employee = await Employee.find({});

  
      if (employee.length === 0) {
        res.status(404).json({ message: 'No employees found' });
      } else {
        res.status(200).json(employee);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const updateEmployee = async (req, res) => {
    try {
      const employeeId = req.params.id;
      const updatedEmployeeData = {
        employeeName: req.body.employeeName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        address: req.body.address,
      };
  
      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedEmployeeData, { new: true });
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const deleteEmployee = async (req, res) => {
    try {
      const employeeId = req.params.id;
  
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
module.exports = {
  createEmployee: createEmployee,
  getEmployees: getEmployees,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee
};
