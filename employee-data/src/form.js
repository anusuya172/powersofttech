import React, { useState,useEffect } from 'react';
import { TextField, Button, FormControl, FormHelperText, Typography, Snackbar, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'; 
const validationSchema = yup.object({
  employeeName: yup.string().matches(/^[A-Za-z\s]+$/, 'name should contain only alphabets').required('name is required'),
  email: yup.string().email('Invalid email').required('Email is required').matches(/\S+@\S+\.\S+/, 'Invalid email format'),
  phoneNumber: yup.string().matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*|\s*)?|[0]?)?[6-9]\d{9}$/, 'Phone number should be 10 digits indian number').required('Phone number is required'),
  role: yup.string().matches(/^[A-Za-z\s]+$/, 'Type of insurance should contain only alphabets').required('Type of insurance is required'),
  address: yup.string().required('Address is required')
});

const baseURL = "http://localhost:8083"; 

const EmployeeForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      employeeName: '',
      email: '',
      phoneNumber: '',
      role: '',
      address: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form Data:", values);
        await axios.post(`${baseURL}/empdata`, values);
        setSuccessMessage(true);
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  });

  const handleClose = () => {
    setSuccessMessage(false);
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      formik.setValues(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formik.values));
  }, [formik.values]);
  return (
    <>
    <h1 style={{textAlign:"center"}}>Employee management</h1>
    <hr/>
    <Box display="flex" justifyContent="center" mt={5}>
 
      <img src='https://img.freepik.com/free-vector/new-employees-requiring-office-work-isolated-flat-vector-illustration-cartoon-hr-manager-hiring-recruiting-personnel-recruitment-vacancy-business-concept_74855-10118.jpg' height="50%" width="50%" style={{marginRight:"30px"}}/>
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: 400 }}>
        <Typography variant="h6">Employee Details</Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            id="employeeName"
            name="employeeName"
           label ="Name"
            variant="outlined"
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
            helperText={formik.touched.employeeName && formik.errors.employeeName}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="role"
            name="role"
            label="Role"
            variant="outlined"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="address"
            name="address"
            label="Address"
            variant="outlined"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Form submitted successfully!"
      /></Box>
</>
  );
};

export default EmployeeForm;
