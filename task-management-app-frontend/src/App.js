// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://taskmanagementbackend-saq8.onrender.com/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://taskmanagementbackend-saq8.onrender.com/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://taskmanagementbackend-saq8.onrender.com/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await axios.put(`https://taskmanagementbackend-saq8.onrender.com/api/tasks/${id}`, updates);
      const updatedTasks = tasks.map((task) =>
        task._id === id ? response.data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  return (
    <div>
      <h1>Task Management App</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button
              onClick={() =>
                handleUpdateTask(task._id, { completed: !task.completed })
              }
              className={`${
                task.completed ? 'complete' : ''
              }`}
            >
              {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
