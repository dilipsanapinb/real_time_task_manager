const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const connection = require('./database/db');
const userRouter = require('./routes/user.routes');
const app = express();

const server=require('http').createServer(app)
const io = require('socket.io')(server);

// express.json middleware to jsonfy the data
app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({ message: "Welcome to Real-Time-Task-Manager" });
})


// routes
app.use('/user', userRouter);

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