const tasksService = require('../../services/tasks/service');
const errors = require('../../services/tasks/errors');
const segregateQueryParams  = require('../query');

const get = (req, res) => {
    res.json(tasksService.get(segregateQueryParams(req.query)));
}

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const task = tasksService.getById(id);
        res.status(200).json(task);
    }catch (error) {
        if (error instanceof errors.TaskNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
    }
}

const create = (req, res) => {
    const task = req.body;
    if (!task.title || !task.description || typeof task.completed !== 'boolean') {
        res.status(400).json({ error: 'Invalid task data' });
        return;
    }
    try {
        const createdTask = tasksService.create(task);
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const task = req.body;
    if (!task.title || !task.description || typeof task.completed !== 'boolean') {
        res.status(400).json({ error: 'Invalid task data' });
        return;
    }
    task.id = id;
    try {
        const updatedTask = tasksService.update(task);
        res.status(200).json(updatedTask);
    }
    catch (error) {
        if (error instanceof errors.TaskNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
    }
    tasksService.update(task);

}

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        tasksService.remove(id);
    }
    catch (error) {
        if (error instanceof errors.TaskNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
    }
    res.status(200).json({message: 'Task deleted'});
}

const getTaskByPriority = (req, res) => {
    const priority = req.params.level;
    try {
        const tasks = tasksService.getTaskByPriority(priority);
        res.status(200).json(tasks);
    } catch (error) {
        if (error instanceof errors.TaskNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error.message });
    }
}





module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    getTaskByPriority
}