import React, { useState } from 'react';
import axios from 'axios';
import './Task.css';

const Task = ({ task, fetchTasks, onViewDetails }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  const updateTask = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { title, description, status }, config);
    fetchTasks();
    setEditing(false);
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, config);
    fetchTasks();
  };

  return (
    <div className="task">
      {editing ? (
        <>
          <input
            className="task-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="task-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <select
            className="task-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button className="task-button save" onClick={updateTask}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
          <div className="task-buttons">
            <button className="task-button delete" onClick={deleteTask}>Delete</button>
            <button className="task-button edit" onClick={() => setEditing(true)}>Edit</button>
            <button className="task-button details" onClick={() => onViewDetails(task)}>View Details</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
