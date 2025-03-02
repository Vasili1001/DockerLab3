const express = require('express');
const router = express.Router();
const db = require('../db');

// Получение всех задач
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// Получение одной задачи по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
});

// Добавление новой задачи
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }
    const [result] = await db.execute(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// Обновление задачи
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const [result] = await db.execute(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ id, title, description });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// Удаление задачи
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

module.exports = router;
