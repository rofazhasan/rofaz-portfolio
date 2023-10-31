import React, { useState } from 'react';
import DatePicker from './DatePicker';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

const App = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (date && time && task) {
      setTasks([...tasks, `${date} - ${time}: ${task}`]);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List for the Day</h1>
      <DatePicker setDate={setDate} />
      <TaskForm setTime={setTime} setTask={setTask} />
      <button onClick={addTask}>Add Task</button>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
