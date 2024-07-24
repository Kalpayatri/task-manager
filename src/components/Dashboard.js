import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskDetailsModal from './TaskDetailsModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    const res = await axios.get('http://localhost:5000/api/tasks', config);
    setTasks(res.data);
    setLoading(false);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm fetchTasks={fetchTasks} />
      {loading ? <p>Loading...</p> : <TaskList tasks={tasks} fetchTasks={fetchTasks} onViewDetails={handleViewDetails}/>}
      {selectedTask && <TaskDetailsModal task={selectedTask} onClose={handleCloseDetails} />}
    </div>
  );
};

export default Dashboard;
