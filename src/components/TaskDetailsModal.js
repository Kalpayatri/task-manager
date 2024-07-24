import React from 'react';
import './TaskDetailsModal.css';

const TaskDetailsModal = ({ task, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Created at:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
