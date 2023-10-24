import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Box } from '@chakra-ui/layout';
import axios from 'axios';
import TasksTable from '../components/tables/TasksTable';
import { useToast } from '@chakra-ui/react';



const TasksPage = () => {
  const [inCompleteTasks, setInCompleteTasks] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem('accesToken'));
        const config = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
        const { data } = await axios.get('http://localhost:8002/task/getalltasks', config);
        // console.log(data);
        const filteredTasks = data.filter((task) => !task.completed);
        // console.log(filteredTasks);
        setInCompleteTasks(filteredTasks)
      } catch (error) {
        console.log('Error occured in fetching all tasks: ', error);
      }
    }
    fetchTasksData();
  });

  const handleDelete =async (taskId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('accesToken'));
        const config = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      await axios.delete(`http://localhost:8002/task/delete/${taskId}`, config);
      toast({
        title: "Task Deleted Successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
      })
    } catch (error) {
      console.log('Error occured at deleting the task', error);
      toast({
        title: "Error occured at deleting task",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
      })
    }
  }
  return (
    <>
      <Navbar />
      <Box>
        <TasksTable tasks={inCompleteTasks} handleDelete={handleDelete}  />
      </Box>
    </>
  )
};

export default TasksPage