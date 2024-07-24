import React, { useState } from 'react';
import Task from './Task';
import TaskDetailsModal from './TaskDetailsModal';

const TaskList = ({ tasks, fetchTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = {
    Todo: tasks.filter(task => task.status === 'Todo'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    Done: tasks.filter(task => task.status === 'Done'),
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="task-columns">
      {Object.keys(columns).map(column => (
        <div key={column} className="task-column">
          <h2>{column}</h2>
          {columns[column].map(task => (
            <Task key={task._id} task={task} fetchTasks={fetchTasks} onViewDetails={handleViewDetails} />
          ))}
        </div>
      ))}
      {selectedTask && <TaskDetailsModal task={selectedTask} onClose={closeModal} />}
    </div>
  );
};

export default TaskList;
