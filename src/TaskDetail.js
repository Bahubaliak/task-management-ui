import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TaskDetail({ fetchTasks }) {
  const navigate = useNavigate();
  const params = useParams()
  const [task, setTask] = useState(null)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const getTask = async () => { 
    try {
      const response = await axios.get(`http://127.0.0.1:3000/tasks/${params.id}`);
      const data = response.data
      setTask({
        name: data.name,
        description: data.description,
        status: data.status,
        id: data.id
      });
      setName(data.name)
      setDescription(data.description)
      setStatus(data.status)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    getTask();
  }, [params.id]);

  const handleUpdateTask = () => {
    let postData = {
      name: name,
      description: description,
      status: status
    }
    axios.put(`http://localhost:3000/tasks/${task.id}`, postData)
    .then(response => {
      navigate('/')
      window.location.reload()
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
  };

  return (
    <React.Fragment>
      {task && (
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
      <button className="btn btn-primary" onClick={handleUpdateTask}>Update Task</button>
    </div>
    )}
    </React.Fragment>
  );
}

export default TaskDetail;
