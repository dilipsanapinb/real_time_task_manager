import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/react';
import { Table,  TableCaption,  Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import axios from 'axios';
import React, { useState } from 'react'

const CompletedTasksTable = ({tasks,handleDelete}) => {
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
                completed:false
            }
            await axios.patch(`http://localhost:8002/task/update/${completed._id}`,updateData, config);
            // console.log(data);
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
        <Box p={4} bg="white" boxShadow="md" borderRadius="lg">
            <Heading as="h2" size="lg" mb={4}>
                Completed-Tasks Table
            </Heading>
            <Table size='sm' variant="striped" colorScheme="teal">
                <TableCaption placement="top">Completed-Tasks Table</TableCaption>
                <Thead >
                    <Tr>
                        <Th>Type of Task</Th>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Assigned To</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        tasks.map((task) => (
                            <Tr key={task._id}>
                                <Td>{task.project}</Td>
                                <Td>{task.title}</Td>
                                <Td>{task.description}</Td>
                                <Td>{task.assignedTo}</Td>
                                <Td>
                                    <Flex>
                                        <Checkbox
                                            size="sm"
                                            colorScheme="green"
                                            onChange={() => handleTaskCompleted(task)}
                                            mr={2}
                                        >
                                            <strong>Mark as Not-Completed</strong>
                                        </Checkbox >
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => `/edit/${task._id}`}
                                            mr={2}
                                        >
                                            Edit
                                        </Button>
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
                        ))
                    }
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Task is Not Completed</ModalHeader>
                    <ModalBody>Are you sure you want to make this task as not completed?</ModalBody>
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
}

export default CompletedTasksTable