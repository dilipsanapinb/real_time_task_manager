const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const server=require('http').createServer(app)
const io = require('socket.io')(server);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})