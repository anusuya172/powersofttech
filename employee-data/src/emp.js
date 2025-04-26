import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Modal,
  Box,
  TextField,

  
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import axios from 'axios';

const Employee = () => {
  const [submittedEmployees, setSubmittedEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    employeeName: '',
    email: '',
    phoneNumber: '',
    role: '',
    address: ''
  });

  const [formErrors, setFormErrors] = useState({
    employeeName: '',
    email: '',
    phoneNumber: '',
    role: '',
    address: ''
  });

  const baseURL = 'http://localhost:8083';

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${baseURL}/empdata`);
      setSubmittedEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []); 

  const validateForm = () => {
    let valid = true;
    const errors = {};

if (!formData.employeeName.trim()) {
  errors.employeeName = 'Employee name is required';
  valid = false;
} else if (!/^[a-zA-Z ]+$/.test(formData.employeeName.trim())) {
  errors.employeeName = 'Employee name should contain only alphabets';
  valid = false;
}

if (!formData.email.trim()) {
  errors.email = 'Email is required';
  valid = false;
} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  errors.email = 'Email address is invalid';
  valid = false;
}

if (!formData.phoneNumber.trim()) {
  errors.phoneNumber = 'Phone number is required';
  valid = false;
} else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
  errors.phoneNumber = 'Phone number must be 10 digits';
  valid = false;
}

if (!formData.role.trim()) {
  errors.role = 'Role is required';
  valid = false;
} else if (!/^[a-zA-Z ]+$/.test(formData.role.trim())) {
  errors.role = 'Role should contain only alphabets';
  valid = false;
}

if (!formData.address.trim()) {
  errors.address = 'Address is required';
  valid = false;
} else if (!/^[a-zA-Z0-9 ]+$/.test(formData.address.trim())) {
  errors.address = 'Address should contain only alphabets and numbers';
  valid = false;
}


    setFormErrors(errors);
    return valid;
  };

  const handleFormSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      if (editMode) {
        await axios.put(`${baseURL}/empdata/${formData._id}`, formData);
      } else {
        await axios.post(`${baseURL}/empdata`, formData);
      }

      setFormData({
        employeeName: '',
        email: '',
        phoneNumber: '',
        role: '',
        address: '' 
      });
      setEditMode(false);
      setOpenModal(false);

      fetchEmployees(); 
    } catch (error) {
      console.error('Error submitting/updating employee:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/empdata/${id}`);
      fetchEmployees();
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  const handleApplyNow = () => {
    setOpenModal(true);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleFormCancel = () => {
    setFormData({
      employeeName: '',
      email: '',
      phoneNumber: '',
      role: '',
      address: ''
    });
    setEditMode(false);
    setOpenModal(false);
    setFormErrors({
      employeeName: '',
      email: '',
      phoneNumber: '',
      role: '',
      address: ''
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: '',
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmployees = submittedEmployees.filter((employee) => {
    const fullName = `${employee.employeeName} ${employee.address}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Grid container spacing={2} mt={3}>
      <Box mb={2} style={{ marginLeft: "30px", width: "300px" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer component={Paper} style={{ margin: "30px" }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#FFB100" }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Type of Insurance</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.employeeName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEdit(employee)} style={{ background: "#FFB100", color: "black" }}>
                    Edit
                  </Button>
                  <Button variant="contained" onClick={() => handleDelete(employee._id)} style={{ background: "#1F3D99", marginLeft: "10px" }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Request a Free Financial Consultation</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            error={!!formErrors.employeeName}
            helperText={formErrors.employeeName}
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!formErrors.phoneNumber}
            helperText={formErrors.phoneNumber}
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!formErrors.address}
            helperText={formErrors.address}
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Type of insurance"
            variant="outlined"
            fullWidth
            name="role"
            value={formData.role}
            onChange={handleChange}
            error={!!formErrors.role}
            helperText={formErrors.role}
            style={{ marginTop: "10px" }}
          />
          <Box mt={2}>
            <Button variant="contained" onClick={handleFormSubmit} mr={2}>
              Submit
            </Button>
            <Button variant="outlined" onClick={handleFormCancel} style={{ marginLeft: "5px" }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Employee;
