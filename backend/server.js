const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({extended: true,limit: "10mb",parameterLimit: 50000,}));
const config = require("./src/Config/dbDependency");
const serverConfig = require("./src/Config/serverConfig");
const port = process.env.PORT || serverConfig.ServerPort;

const Employee = require("./src/page/Router/emp");

const Task = require("./src/page/Router/task");
const uploadRoutes = require('./src/page/Router/upload');
const WorkItem = require('./src/page/Router/dashboard');

app.use(uploadRoutes);

app.use(Employee); 
app.use(Task); 
app.use(WorkItem); 
 
mongoose
.connect(config.dbURL, {useUnifiedTopology: true,useNewUrlParser: true,})
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("MongoDB connection error:", err);});
 
 

 



 
app.use("/api/v1/health", async (req, res) => {
  try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
  } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
});
 
 
 
setInterval(async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  console.log('Current Time:', new Date());
  console.log('Twenty-Four Hours Ago:', twentyFourHoursAgo);
  try {
    const result = await LoggingModel.deleteMany({ expirationTime: { $lt: twentyFourHoursAgo } });
    console.log('Logs older than 24 hours deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting logs:', error);
  }
}, 24 * 60 * 60 * 1000);
 
 
 
 
app.listen(port, () => {
  console.log("CONNECT Server is running on http://localhost: " + port);
});

