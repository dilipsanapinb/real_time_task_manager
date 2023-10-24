import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Textarea, useBreakpointValue, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:8002/task');


const CreateTaskForm = ({ users }) => {
    const [project, setProject] = useState('');
    const [assignedTo, setAssignedTo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const toast=useToast()

    const flexDirection = useBreakpointValue({ base: 'column', md: 'row', lg: 'row' });

    const handleCreteTask = async () => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('accesToken'));
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            // console.log(project, assignedTo, title, description);
            const response = await axios.post('http://localhost:8002/task/create', { project, assignedTo, title, description }, config);
            
            // emit event
            socket.emit('createTask', response.data);


            toast({
                title: "Task Created Successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            navigate('/tasks')
        } catch (error) {
            console.log('Something went wrong at creating the task: ', error);
            toast({
                title: "Error",
                description: 'Something went wrong at creating the task',
                status: 'error',
                'duration': 5000,
                isClosable: true,
                position:'bottom'
            })
        }
    }
    return (
        <Box maxW="700px" p={4} m="auto" border={'1px solid gray'} shadow={'lg'} borderRadius={10}>
            <Flex direction={flexDirection}>
                {/* Type of task options */}
                <FormControl mb={4}>
                    <FormLabel>Type of Task</FormLabel>
                    <Select placeholder='Select Type of Task' onChange={(e) => setProject(e.target.value)}>
                        <option value='personal'>Personal</option>
                        <option value='office'>Office</option>
                        <option value='home'>Home</option>
                    </Select>
                </FormControl>

                {/* Assigned to select options */}
                <FormControl mb={4}>
                    <FormLabel>Assigned Task  To</FormLabel>
                    <Select placeholder='Select Assigned To' onChange={(e) => setAssignedTo(e.target.value)}>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>{user.username}</option>
                        ))}
                    </Select>
                </FormControl>
            </Flex>
            <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input placeholder='Task title ...' onChange={(e) => setTitle(e.target.value)}></Input>
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea size={'lg'} placeholder='Please describe the task .....' onChange={(e) => setDescription(e.target.value)}></Textarea>
            </FormControl>
            <Flex justifyContent={'space-between'}>
                <Button colorScheme="gray" variant='outline'>Cancel</Button>
                <Button colorScheme='blue' variant='solid' onClick={handleCreteTask}>Create</Button>
            </Flex>
        </Box>
    )
};

export default CreateTaskForm