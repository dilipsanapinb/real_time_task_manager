import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Box, Flex,Text } from '@chakra-ui/layout';



const TasksPage = () => {
  return (
      <>
      <Navbar />
      <Flex>
      

      {/* Task List */}
      <Box p={4} flex="1">
        {/* Task list components go here */}
        <Text fontSize="lg">Task List</Text>
        {/* Add your task list rendering here */}
      </Box>
    </Flex>
      </>
  )
}

export default TasksPage