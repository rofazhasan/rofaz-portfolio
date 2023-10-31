import React from 'react';

const TaskForm = ({ setTime, setTask }) => {
  return (
    <div>
      <input type="time" onChange={(e) => setTime(e.target.value)} />
      <input type="text" placeholder="Enter your task" onChange={(e) => setTask(e.target.value)} />
    </div>
  );
};

export default TaskForm;
