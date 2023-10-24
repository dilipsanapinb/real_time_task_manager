import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { Avatar, Box, Flex, useToast,Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GetProfile = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();
    const navigate=useNavigate()
    // fetch user profile
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = JSON.parse(localStorage.getItem('accesToken'));
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                const { data } = await axios.get(`http://localhost:8002/user/getprofile`, config);
                // console.log(data);
                setUser(data.user);
                setLoading(false);
                setLoading(false);
            } catch (error) {
                console.log('Something went wrong at fetching the user profile', error);
                setError(error);
                setLoading(false);
            }
        }
        
        fetchUserData();
        
    }, []);
    // console.log(user);

    const handleLogout = () => {
        localStorage.removeItem('accesToken');
        navigate('/')
        toast({
            title: 'Logged out successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom'
        });
    };
    return (
        <>
            <Navbar />
            <Box p={4} bg={'white'} boxShadow={'md'} borderRadius={'lg'}>
                <Flex align={'center'}>
                    <Avatar size={'xl'} name={user && user.username} />
                    <Box ml={4}>
                        {user && <Text fontSize='xl'>{user.username}</Text>}
                        {user && <Text>{user.email}</Text>}
                    </Box>
                </Flex>
                {loading && <p>Loading user data...</p>}
                {error && <p>Error:{error.message}</p>}
                <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </>
    )
};

export default GetProfile