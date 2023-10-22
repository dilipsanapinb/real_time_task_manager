const express = require('express');
const taskControllers = require('../controllers/task.controllers');
const authenticateUser = require('../middlewares/authenticate.middleware');
const authoriseUser = require('../middlewares/authorise.middleware');

const taskRouter = express.Router();

// create the task
taskRouter.post('/create', authenticateUser,taskControllers.createTask);

// get all tasks
taskRouter.get("/getalltasks", authenticateUser, taskControllers.getAllTasks);

// get task by id;
taskRouter.get("/:id", authenticateUser, taskControllers.getTaskById);

// update the task
taskRouter.patch("/update/:id", authenticateUser, taskControllers.updateTask);

// delete the task 
taskRouter.delete("/delete/:id", authenticateUser, taskControllers.deleteTask);


module.exports = taskRouter;
