const fs = require('fs');
const path = require('path');
const errors = require('./errors');

const tasksPath = path.join(__dirname, '../../../task.json');

const get = ({filter = {},pagination = {}}) => {
    const tasks = fs.readFileSync(tasksPath, 'utf8');
    const tasksJson = JSON.parse(tasks);
    let result = tasksJson.tasks;
    if (Object.keys(filter).length !== 0) {
        result.filter(task => {
            let isMatch = true;
            Object.keys(filter).forEach(key => {
                if (String(task[key]) !== String(filter[key])) {
                    isMatch = false;
                }
            });
            return isMatch;
        });
    }
    if (Object.keys(pagination).length === 0) {
        return result;
    }
    if (pagination.orderBy === undefined) {
        pagination.orderBy = 'createdAt';
    }

    result.sort((a, b) => {
        if (pagination.asc) {
            return pagination.orderBy > b.orderBy ? 1 : -1;
        }
        return pagination.orderBy < pagination.orderBy ? 1 : -1;
    })

    if (pagination.limit !== undefined) {
        if (pagination.cursor === undefined) {
            pagination.cursor = 0;
        }
        result = result.slice(pagination.cursor, pagination.cursor + pagination.limit);
    }

    return result;
}

const getById = (id) => {
    const tasks = get({filter :{}, pagination : {}});
    const task = tasks.find(task => task.id === id);
    if (!task) {
        throw new errors.TaskNotFoundError();
    }
    return task;
}

const create = (task) => {
    const tasks = get({filter :{}, pagination : {}});
    task.id = getMaxId()+1;
    task.CreatedAt = new Date();
    tasks.push(task);
    fs.writeFileSync(tasksPath, JSON.stringify({tasks : tasks}));
    return task;
}

const getMaxId = () => {
    const tasks = get({filter :{}, pagination : {}});
    return tasks.reduce((max, task) => task.id > max ? task.id : max, 0);
}

const update = (updatedTask) => {
    const tasks = get({filter :{}, pagination : {}});
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex === -1) {
        throw new errors.TaskNotFoundError();
    }
    tasks[taskIndex] = updatedTask;
    fs.writeFileSync(tasksPath, JSON.stringify({tasks : tasks}));
    return updatedTask;
};

const remove = (id) => {
    const tasks = get({filter :{}, pagination : {}});
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        throw new errors.TaskNotFoundError();
    }
    tasks.splice(taskIndex, 1);
    fs.writeFileSync(tasksPath, JSON.stringify({tasks : tasks}));
}

const getTaskByPriority = (priority) => {
    const tasks = get({priority : priority});
    if (tasks.length === 0) {
        throw new errors.TaskNotFoundError();
    }
    return tasks;

}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    getTaskByPriority
}