import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const PercentageGrowthCircle = ({ title, percentage, growthDescription, color }) => {
  return (
    <Card style={{ textAlign: 'center', margin: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" marginBottom="20px">
          <Box width="120px" height="120px">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                pathColor: color,
                textColor: '#000',
                trailColor: '#d6d6d6',
                backgroundColor: '#f3f3f3',
              })}
            />
          </Box>
        </Box>
        <Typography variant="body1" color="textSecondary">
          {growthDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

PercentageGrowthCircle.propTypes = {
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  growthDescription: PropTypes.string.isRequired,
  color: PropTypes.string,
};

PercentageGrowthCircle.defaultProps = {
  color: '#3e98c7',
};

export default PercentageGrowthCircle;
