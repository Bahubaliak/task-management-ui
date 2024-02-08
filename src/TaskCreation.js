import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskCreation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const navigate = useNavigate();

  const handleAddTask = async () => {
    try {
      await axios.post(`http://127.0.0.1:3000/tasks`, {
        name: name,
        status: status,
        description: description
      });
      navigate('/')
    } catch (error) {
      debugger
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskCreation;
