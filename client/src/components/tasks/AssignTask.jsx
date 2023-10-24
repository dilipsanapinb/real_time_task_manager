import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Heading } from '@chakra-ui/react';
import CreateTaskForm from '../forms/CreateTaskForm';
import axios from 'axios';


const AssignTask = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            const fetchAllUsers = async () => {
                const { data } = await axios.get('http://localhost:8002/user/allusers');
                setUsers(data.users);
                // console.log(users);
            }
            fetchAllUsers();
        } catch (error) {
            console.log('Something went wrong at fetching all users data: ', error);
        }
    })
    return (
        <>
            <Navbar />
            <Heading margin={10} textAlign={'center'}>Assign A Task</Heading>
            <Box margin={10} >
                <CreateTaskForm users={users} />
            </Box>
        </>
    )
};

export default AssignTask