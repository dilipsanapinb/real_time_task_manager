import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Heading } from '@chakra-ui/react';

import axios from 'axios';
import EditTaskForm from '../forms/EditTaskForm';

const EditTask = () => {

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
            <Heading margin={10} textAlign={'center'}>Edit A Task</Heading>
            <Box margin={10} >
                <EditTaskForm users={users} />
            </Box>
        </>
    )
};

export default EditTask