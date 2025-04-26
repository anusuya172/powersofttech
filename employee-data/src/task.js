import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = "http://localhost:8083";

const TaskManagement = () => {
  const [projects] = useState(['Finance Project', 'Employee Project', 'Demo Project']);
  const [employees, setEmployees] = useState([
    { id: '1', name: 'John Doe', project: 'Finance Project' },
    { id: '2', name: 'Jane Smith', project: 'Employee Project' },
    { id: '3', name: 'Sarah Lee', project: 'Demo Project' },
  ]);

  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    employeeId: '',
    eta: '',
    image: '',
  });

  useEffect(() => {
    if (selectedProject) {
      axios.get(`${BASE_URL}/tasks?project=${selectedProject}`)
        .then((response) => setTasks(response.data))
        .catch((error) => console.error('Error fetching tasks:', error));
    }
  }, [selectedProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setNewTask({
      title: '',
      description: '',
      employeeId: '',
      eta: '',
      image: '',
    });
    setIsEditing(false);
    setEditTaskId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios.post(`${BASE_URL}/upload`, formData)
        .then((response) => {
          setNewTask((prev) => ({ ...prev, image: response.data.url }));
        })
        .catch((error) => console.error('Error uploading image:', error));
    }
  };

  const handleCreateTask = () => {
    const { title, employeeId, eta } = newTask;

    if (!selectedProject || !title || !employeeId || !eta) {
      alert("Please fill all required fields (Project, Title, Employee, ETA).");
      return;
    }

    const payload = { ...newTask, project: selectedProject };

    axios.post(`${BASE_URL}/tasks`, payload)
      .then(() => {
        setNewTask({ title: '', description: '', employeeId: '', eta: '', image: '' });
        return axios.get(`${BASE_URL}/tasks?project=${selectedProject}`);
      })
      .then((response) => setTasks(response.data))
      .catch((err) => console.error("Error:", err));
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      employeeId: task.employeeId,
      eta: task.eta,
      image: task.image,
    });
    setIsEditing(true);
    setEditTaskId(task._id);
  };

  const handleSaveEditedTask = () => {
    axios.put(`${BASE_URL}/tasks/${editTaskId}`, { ...newTask, project: selectedProject })
      .then(() => {
        setNewTask({ title: '', description: '', employeeId: '', eta: '', image: '' });
        setIsEditing(false);
        setEditTaskId(null);
        return axios.get(`${BASE_URL}/tasks?project=${selectedProject}`);
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error saving task:', error));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`${BASE_URL}/tasks/${taskId}`)
      .then(() => setTasks((prev) => prev.filter((task) => task._id !== taskId)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#2c3e50' }}>🚀 Task Management Dashboard</h1>

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Select a Project</h4>
        <select className="form-select" onChange={handleProjectChange} value={selectedProject}>
          <option value="">-- Select Project --</option>
          {projects.map((project) => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
      </div>

      {selectedProject && (
        <>
          <div className="card shadow p-4 mb-5">
            <h4 className="mb-3">{isEditing ? '✏️ Edit Task' : '➕ Create New Task'}</h4>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input name="title" value={newTask.title} className="form-control" onChange={handleInputChange} placeholder="Enter task title..." />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" value={newTask.description} className="form-control" onChange={handleInputChange} placeholder="Enter task description..." />
            </div>

            <div className="mb-3">
              <label className="form-label">Assign Employee</label>
              <select name="employeeId" className="form-select" value={newTask.employeeId} onChange={handleInputChange}>
                <option value="">-- Select Employee --</option>
                {employees.filter((emp) => emp.project === selectedProject)
                  .map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">ETA (Deadline)</label>
              <input type="date" name="eta" value={newTask.eta} className="form-control" onChange={handleInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>

            <button
              type="button"
              className="btn btn-success w-100"
              onClick={isEditing ? handleSaveEditedTask : handleCreateTask}
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>

          <div>
            <h4 className="mb-3 text-primary">📋 Task List</h4>
            <div className="row">
              {tasks.filter((task) => task.project === selectedProject)
                .map((task) => (
                  <div key={task._id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <p className="card-text">
                          <strong>Assigned to:</strong> {employees.find((e) => e.id === task.employeeId)?.name}
                        </p>
                        <p className="card-text">
                          <strong>ETA:</strong> {task.eta}
                        </p>
                        {task.image && (
                          <img src={task.image} alt="Task" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                        )}
                        <div className="d-flex justify-content-between mt-3">
                          <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditTask(task)}>Edit</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManagement;
