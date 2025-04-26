import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1F3D99' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <HistoryEduIcon style={{ fontSize: '40px' }} />
          </Link>
          <Typography variant="h4" component="div" sx={{ color: '#FFB100', marginLeft: '3px' }}>
   PowerSoft
          </Typography>
        </div>
        <div>
          <Button color="inherit" component={NavLink} to="/" style={{ textDecoration: 'none', color: '#FFB100' }}>
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/emp" style={{ textDecoration: 'none', color: '#FFB100' }}>
            Employee List
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
