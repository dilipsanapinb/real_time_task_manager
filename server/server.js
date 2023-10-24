const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const connection = require('./database/db');
const userRouter = require('./routes/user.routes');
const taskRouter=require('./routes/task.routes')
const app = express();
const cors = require('cors');
const server=require('http').createServer(app)
const io = require('socket.io')(server);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PATCH","DELETE"],
  })
);
// express.json middleware to jsonfy the data
app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({ message: "Welcome to Real-Time-Task-Manager" });
})


// routes
app.use('/user', userRouter);
app.use('/task', taskRouter);





// socket.io

// socket.io namespace;
const taskNamespace = io.of('/task');

// listen the connection
taskNamespace.on('connection', (socket) => {
  console.log('A user connnected to the tasks namespace.');

  // create the task
  socket.on('createTask', (data) => {
    console.log('Task created: ', data);
    taskNamespace.emit('taskCreated', data)
  });

  // update a task;
  socket.on('updateTask', (data) => {
    console.log('Task updated: ', data);
    
    taskNamespace.emit('taskUpdated', data);
  });

  // delete task
  socket.on('deleteTask', (taskId) => {
    console.log('Task deleted', taskId);
    taskNamespace.emit('taskDeleted', taskId);
  });
});



server.listen(PORT, async () => {
    // before starting the server check the connection with DB in asynchronous manner;
    try {
        await connection;
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Error in connecting the DB: ", error);
    }
    console.log(`Server is running on port ${PORT}`);
});