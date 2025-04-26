
import React from 'react';
import Footer from './footer';
import EmployeeForm from './form';
import TaskManagement from './task';
import Dashboard from './dashboard';


const Home = () => {
  return (
    <>
  <Dashboard/>
    {/* <Grid container spacing={2}>
      
      <Grid item xs={12} sm={6}>
        <img
          src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?semt=ais_hybrid&w=740"
          alt="Image Title"
          style={{ width: '100%', height: '100%', objectFit: 'cover',marginTop:"30px" }}
        />
      </Grid>

      <Grid item xs={12} sm={6} >
        <Typography variant="h3" gutterBottom sx={{textAlign:"center",marginTop:"35%"}}>
        Your Trusted Partner in Achieving Financial Success.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"30px"}}>
 <Link to="/form"> <Button variant="contained" style={{background:"#FF9200"}}>Apply Now</Button></Link>
</div>
<Grid style={{justifyContent:"flex-end",display:"flex"}}>
<img
          src="https://img.freepik.com/free-vector/job-interview-process-hiring-new-employees-hr-specialist-cartoon-character-talking-new-candidatee-recruitment-employment-headhunting-concept-illustration_335657-2034.jpg?semt=ais_hybrid&w=740" // Replace with the actual path to your image
          alt="Image Title"
          style={{ width: '30%', height:'30%',marginRight:"10%"}}
        />
 </Grid>
      </Grid>
    </Grid> */}
    <EmployeeForm/>
   <TaskManagement/>
 <Footer/>
     </>
  );
};

export default Home;
