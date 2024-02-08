import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import TaskCreation from './TaskCreation';

function App() {
  const deleteTask = (taskId) => {
    // setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList deleteTask={deleteTask} />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/tasks/new" element={<TaskCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
