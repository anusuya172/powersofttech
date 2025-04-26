
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './Home';
import Footer from './footer';
import EmployeeForm from './form';
import Employee from './emp';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/form" element={<EmployeeForm/>} />
        <Route path="/emp" element={<Employee/>} />
      </Routes>
    </Router>
  );
};

export default App;
