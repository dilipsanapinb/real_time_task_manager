const express = require('express');
const taskControllers = require('../controllers/task.controllers');
const authenticateUser = require('../middlewares/authenticate.middleware');
const authoriseUser = require('../middlewares/authorise.middleware');

const taskRouter = express.Router();

// create the task
taskRouter.post('/create', authenticateUser,authoriseUser(['user','admin']),taskControllers.createTask);

// get all tasks
taskRouter.get("/getalltasks", authenticateUser,authoriseUser(['user','admin']), taskControllers.getAllTasks);

// get task by id;
taskRouter.get("/:id", authenticateUser,authoriseUser(['user','admin']), taskControllers.getTaskById);

// update the task
taskRouter.patch("/update/:id", authenticateUser,authoriseUser(['user','admin']), taskControllers.updateTask);

// delete the task 
taskRouter.delete("/delete/:id", authenticateUser,authoriseUser(['user','admin']), taskControllers.deleteTask);


module.exports = taskRouter;
