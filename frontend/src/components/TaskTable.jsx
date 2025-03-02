import React from 'react';
import { Link } from 'react-router-dom';

function TaskTable({ tasks, onDeleteTask }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td className="table-actions">
              <Link to={`/tasks/${task.id}`} className="btn btn-view">
                View
              </Link>
              <Link to={`/tasks/${task.id}/edit`} className="btn btn-edit">
                Edit
              </Link>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {tasks.length === 0 && (
          <tr>
            <td colSpan="4">No tasks found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TaskTable;
