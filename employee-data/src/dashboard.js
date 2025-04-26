import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
const base_url="http://localhost:8083"
const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [workItems, setWorkItems] = useState({
    'NeedToDo': [],
    'InProgress': [],
    'NeedForTest': [],
    'Completed': [],
    'Reopen': [],
  });

  const fetchWorkItems = async () => {
    try {
      const res = await axios.get(`${base_url}/workitems`);
      const data = res.data;

      const grouped = {
        'NeedToDo': [],
        'InProgress': [],
        'NeedForTest': [],
        'Completed': [],
        'Reopen': [],
      };

      data.forEach(item => {
        if (grouped[item.status]) {
          grouped[item.status].push(item);
        }
      });

      setWorkItems(grouped);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkItems();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn) {
      const items = Array.from(workItems[sourceColumn]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setWorkItems(prev => ({
        ...prev,
        [sourceColumn]: items,
      }));
    } else {
      const sourceItems = Array.from(workItems[sourceColumn]);
      const destItems = Array.from(workItems[destColumn]);
      const [movedItem] = sourceItems.splice(source.index, 1);

      const updatedItem = { ...movedItem, status: destColumn };

      await axios.put(`${base_url}/workitems/${movedItem._id}`, updatedItem);

      destItems.splice(destination.index, 0, updatedItem);

      setWorkItems(prev => ({
        ...prev,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems,
      }));
    }
  };

  const handleProjectFilter = (e) => {
    setSelectedProject(e.target.value);
  };

  const filterWorkItemsByProject = (items) => {
    if (!selectedProject) return items;
    return items.filter(item => item.project === selectedProject);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 style={{
            fontWeight: '700',
            color: '#fff',
            borderBottom: '3px solid #FFB100',
            display: 'inline-block',
            paddingBottom: '5px',
            fontFamily: 'Segoe UI, sans-serif',
            background: 'linear-gradient(45deg, #FFB100, #1F3D99)',
            borderRadius: '8px',
            padding: '10px 20px',
          }}>
            Project Dashboard
          </h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <select className="form-select" onChange={handleProjectFilter}>
            <option value="">Filter by Project</option>
            <option value="Finance Project">Finance Project</option>
            <option value="Employee Project">Employee Project</option>
            <option value="Demo Project">Demo Project</option>
          </select>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {['NeedToDo', 'InProgress', 'NeedForTest', 'Completed', 'Reopen'].map((status) => (
            <div className="col-md-2" key={status}>
              <h5 style={{
                background: 'linear-gradient(45deg, rgb(254, 179, 4), #1F3D99)',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
              }}>
                {status.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </h5>

              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    className="task-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '10px',
                      minHeight: '300px',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #ffffff 30%, #f3f4f6 100%)',
                    }}
                  >
                    {filterWorkItemsByProject(workItems[status]).map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card"
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: '#fff',
                              borderRadius: '10px',
                              padding: '15px',
                              marginBottom: '10px',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease-in-out',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            <div className="d-flex">
                              <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  border: '2px solid #FFB100',
                                }}
                              />
                              <div style={{ marginLeft: '10px' }}>
                                <h6 style={{
                                  fontWeight: '600',
                                  color: '#333',
                                  fontSize: '16px',
                                  marginBottom: '5px',
                                }}>
                                  {item.title}
                                </h6>
                                <p className="text-muted" style={{ fontSize: '12px' }}>Assigned: {item.employee}</p>
                                <p className="text-muted" style={{ fontSize: '12px' }}>ETA: {item.eta}</p>
                                <p className="text-muted" style={{ fontSize: '12px' }}>Project: {item.project}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
