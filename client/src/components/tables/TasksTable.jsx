import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/react';
import { Table,  TableCaption,  Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TasksTable = ({ tasks, handleDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [completed, setCompletedTask] = useState(null);

    const handleTaskCompleted = (task) => {
        setCompletedTask(task);
        onOpen();
    };

    const confirmTaskComplete = async() => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('accesToken'));
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            const updateData = {
                completed:true
            }
            await axios.patch(`http://localhost:8002/task/update/${completed._id}`,updateData, config);
            // console.log(data);
            const filteredTasks = tasks.filter((task) =>task._id!==completed._id);
            setCompletedTask(filteredTasks);


            toast({
                title: "Task Status Updated",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            onClose();
        } catch (error) {
            console.log('Something went wrong updationg the status of task: ', error);
            toast({
                title: "Something went wrong at creating the toast",
                status: 'error',
                'duration': 5000,
                isClosable: true,
                position:'bottom'
            })
        }
        onClose();
    }
    return (
        <Box p={4} bg="white" boxShadow="md" borderRadius="lg" overflow={'auto'}>
            <Heading as="h2" size="lg" mb={4}>
                Tasks Table
            </Heading>
            <Table size='sm' variant="striped" colorScheme="teal">
                <TableCaption placement="top">Tasks Table</TableCaption>
                <Thead >
                    <Tr>
                        <Th>Type of Task</Th>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Assigned To</Th>
                        <Th>Assigned By</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        tasks.map((task) => (
                            <TaskRow
              key={task._id}
              task={task}
              handleTaskCompleted={handleTaskCompleted}
              handleDelete={handleDelete}
            />
                        ))
                    }
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Task Completetion</ModalHeader>
                    <ModalBody>Are you sure you want to make this task as completed?</ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='green'
                            onClick={confirmTaskComplete}
                        >
                            Confirm
                        </Button>
                        <Button
                            colorScheme='gray'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        
    )
};

const TaskRow = ({ task, handleTaskCompleted, handleDelete }) => {
    const [assignedToName, setAssignedToName] = useState('');
    const [assignedByName, setAssignedByName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const accessToken = JSON.parse(localStorage.getItem('accesToken'));
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                const [userData,assignedByData]=await Promise.all([await axios.get(`http://localhost:8002/user/${task.assignedTo}`, config),
                
                await axios.get(`http://localhost:8002/user/${task.assignedBy}`, config)])
                
                setAssignedToName(userData.data.user.username);
                setAssignedByName(assignedByData.data.user.username);
            } catch (error) {
                console.log('Error fetching user name: ', error);
                setAssignedToName('N/A');
                setAssignedByName('N/A');
            }
        }
        fetchUserName();
    }, [task.assignedTo,task.assignedBy]);
    return (
        <Tr>
            <Td>{task.project}</Td>
            <Td>{task.title}</Td>
            <Td>{task.description}</Td>
            <Td>{assignedToName}</Td>
            <Td>{assignedByName}</Td>
            <Td>
                <Flex>
                    <Checkbox
                        size="sm"
                        colorScheme="green"
                        onChange={() => handleTaskCompleted(task)}
                        mr={2}
                    >
                        <strong>Mark as Completed</strong>
                    </Checkbox >
                    <Link to={`/edit/${task._id}`}>
                        <Button
                            size="sm"
                            colorScheme="blue"
                                            
                            mr={2}
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(task._id)}
                    >
                        Delete
                    </Button>
                </Flex>
            </Td>
        </Tr>
    )
};
export default TasksTable