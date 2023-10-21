const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const connection=require('./database/db')
const app = express();

const server=require('http').createServer(app)
const io = require('socket.io')(server);


server.listen(PORT, async () => {
    try {
        await connection;
        console.log('Successfully connected to DB');
    } catch (error) {
        console.log('Error in connecting the DB: ',error);
    }
    console.log(`Server is running on port ${PORT}`);
})