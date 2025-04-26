
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1F3D99', 
        padding: '21px',
        color: 'white',
        textAlign: 'center',
      }}
      mt={5}
    >
      <Typography variant="h5" mb={2}>
      PowerSoft Tech
      </Typography>
      <Typography variant="body2" mb={1}>
        Contact Number: +91 6786789980
      </Typography>
      <Typography variant="body2">
        Address: 1234 Galaxy Street, Space City.
      </Typography>
    </Box>
  );
};

export default Footer;
