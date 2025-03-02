import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';

const API_URL = 'http://localhost:3001/api/tasks';

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Is the backend running?');
    }
    setLoading(false);
  };

  const addTask = async (title, description) => {
    try {
      await axios.post(API_URL, { title, description });
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="task-list">
      <h1 className="title">ToDo List</h1>

      {error && <div className="error-message">{error}</div>}

      <TaskForm onAddTask={addTask} />

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskTable tasks={tasks} onDeleteTask={deleteTask} />
      )}
    </div>
  );
}

export default TaskListPage;
