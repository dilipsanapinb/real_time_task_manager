const express = require('express');
const userControllers = require("../controllers/user.controllers");
const userRouter = express.Router();


// get all users
userRouter.get('/allusers', userControllers.getAllUsers);

// get user by id
userRouter.get('/:userId', userControllers.getUserById);

// register the user
userRouter.post('/register', userControllers.registerUser);

// login the user
userRouter.post('/login', userControllers.loginUser);

module.exports = userRouter;

