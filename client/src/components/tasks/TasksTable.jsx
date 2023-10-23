import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Table,  TableCaption,  Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useState } from 'react'

const TasksTable = ({ tasks, handleDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [completed, setCompletedTask] = useState(null);

    const handleTaskCompleted = (task) => {
        setCompletedTask(task);
        onOpen();
    };

    const confirmTaskComplete = () => {
        
        onClose();
    }
    return (
        <Box p={4} bg="white" boxShadow="md" borderRadius="lg">
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
                                            <strong>Mark as Completed</strong>
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
export default TasksTable