const tasksCtrl = require("../controllers/tasks/controller");

const express = require('express');
const router = express.Router();

router.get("/tasks", tasksCtrl.get);
router.get("/tasks/:id", tasksCtrl.getById);
router.post("/tasks", tasksCtrl.create);
router.put("/tasks/:id", tasksCtrl.update);
router.delete("/tasks/:id", tasksCtrl.remove);
router.get("/tasks/priority/:level", tasksCtrl.getTaskByPriority);

module.exports = router;