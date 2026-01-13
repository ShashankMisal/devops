const crypto = require('crypto');
const store = require('../data/tasks.store');

function generateId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function validateTitle(title) {
  if (typeof title !== 'string') {
    return 'Title must be a string.';
  }
  const trimmed = title.trim();
  if (!trimmed) {
    return 'Title is required.';
  }
  if (trimmed.length > 200) {
    return 'Title must be 200 characters or less.';
  }
  return '';
}

function getTasks(req, res) {
  res.json(store.getAll());
}

function createTask(req, res) {
  const { title } = req.body || {};
  const validationError = validateTitle(title);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const task = {
    id: generateId(),
    title: title.trim(),
    createdAt: new Date().toISOString()
  };

  store.create(task);
  return res.status(201).json(task);
}

function deleteTask(req, res) {
  const { id } = req.params;
  const removed = store.removeById(id);
  if (!removed) {
    return res.status(404).json({ error: 'Task not found' });
  }
  return res.status(204).send();
}

module.exports = {
  getTasks,
  createTask,
  deleteTask
};
