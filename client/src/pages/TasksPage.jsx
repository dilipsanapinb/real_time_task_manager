import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Box } from '@chakra-ui/layout';
import axios from 'axios';
import TasksTable from '../components/tasks/TasksTable';



const TasksPage = () => {
  const [inCompleteTasks, setInCompleteTasks] = useState([]);
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

  const handleEdit =async () => {
    
  }
  const handleDelete =async () => {
    
  }
  return (
    <>
      <Navbar />
      <Box>
        <TasksTable tasks={inCompleteTasks} handleDelete={handleDelete} handleEdit={handleEdit } />
      </Box>
    </>
  )
};

export default TasksPage