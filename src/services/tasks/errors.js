
class TaskNotFoundError extends Error {
    constructor() {
        super('Task not found');
        this.name = 'TaskNotFoundError';
    }
}

module.exports = {
    TaskNotFoundError
}