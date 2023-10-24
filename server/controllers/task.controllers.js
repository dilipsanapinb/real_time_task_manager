const Task = require('../models/task.model');


// create the task
exports.createTask = async (req, res) => {
    try {
        const assignedBy = req.body.userId;
        const { description, title, assignedTo,project } = req.body;
        const task = new Task({ description, title, assignedTo, project,assignedBy });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error creating the task" });
    }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
    try {
        const userRole = req.body.userRole;
        const userId = req.body.userId;
        let tasks;
        if (userRole === "admin") {
            tasks = await Task.find();
        } else {
            tasks = await Task.find({
                $or: [{ assignedTo: userId }, { assignedBy: userId }],
            });
        }

        res.status(200).json(tasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching tasks" });
    }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching the task" });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const updateData = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating the task" });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting the task" });
    }
};