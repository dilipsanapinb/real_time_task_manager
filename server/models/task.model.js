const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    project: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        'ref': 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default:false,
    }
}, {timestamps: true});

const Task = mongoose.model('task', taskSchema);
module.exports = Task;