import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskList() {

  const [tasks, setTasks] = useState([]);
  const [updatedTask, setUpdatedTask] = useState()

  const fetchTasks = async () => { 
    try {
      const response = await axios.get('http://127.0.0.1:3000/tasks');
      console.log('response', response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/tasks/${id}`);
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [updatedTask]);

  const navigate = useNavigate();

  const handleUpdate = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleAddTask = () => {
    navigate('/tasks/new');
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <div className="mb-3">
        <button className="btn btn-success" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleUpdate(task.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
