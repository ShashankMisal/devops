const tasks = [];

function getAll() {
  return tasks;
}

function create(task) {
  tasks.unshift(task);
  return task;
}

function removeById(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  create,
  removeById
};
