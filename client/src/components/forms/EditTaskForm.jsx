import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Textarea, useBreakpointValue, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8002/task');

const EditTaskForm = ({ users }) => {
    const { taskId} = useParams();
const [project, setProject] = useState('');
    const [assignedTo, setAssignedTo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const toast=useToast()

    const flexDirection = useBreakpointValue({ base: 'column', md: 'row', lg: 'row' });

    
    // Fetch the data of task by id:
    useEffect(() => {
        fetchTask();
    }, []);
    
    const fetchTask = async() => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('accesToken'));
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            const { data } = await axios.get(`http://localhost:8002/task/${taskId}`, config);
            // console.log(data);
            setProject(data.project);
            setAssignedTo(data.assignedTo);
            setTitle(data.title);
            setDescription(data.description);
            // console.log(project,assignedTo,title,description);
        } catch (error) {
            console.log('Something went wrong at getting the task by id: ', error);
            toast({
                title: "Something went wrong at getting the task by id",
                status: 'error',
                'duration': 5000,
                isClosable: true,
                position:'bottom'
            })
        }
    }
    const handleEditTask = async () => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('accesToken'));
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            const updateData ={ project, assignedTo, title, description }
            // console.log(project, assignedTo, title, description);
            await axios.patch(`http://localhost:8002/task/update/${taskId}`,updateData , config);
            // console.log(data);

            // emit the event
            socket.emit('editTask',taskId,updateData)
            toast({
                title: "Task Edited Successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            navigate('/tasks')
        } catch (error) {
            console.log('Something went wrong at updating the task: ', error);
            toast({
                title: "Something went wrong at updating the task",
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
                    <Select placeholder='Select Type of Task' value={project} onChange={(e) => setProject(e.target.value)}>
                        <option value='personel'>Personel</option>
                        <option value='office'>Office</option>
                        <option value='home'>Home</option>
                    </Select>
                </FormControl>

                {/* Assigned to select options */}
                <FormControl mb={4}>
                    <FormLabel>Assigned Task  To</FormLabel>
                    <Select placeholder='Select Assigned To' value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>{user.username}</option>
                        ))}
                    </Select>
                </FormControl>
            </Flex>
            <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input placeholder='Task title ...' value={title} onChange={(e) => setTitle(e.target.value)}></Input>
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea size={'lg'} value={description} placeholder='Please describe the task .....' onChange={(e) => setDescription(e.target.value)}></Textarea>
            </FormControl>
            <Flex justifyContent={'space-between'}>
                <Button colorScheme="gray" variant='outline'>Cancel</Button>
                <Button colorScheme='blue' variant='solid' onClick={handleEditTask}>Edit Task</Button>
            </Flex>
        </Box>
    )
}

export default EditTaskForm