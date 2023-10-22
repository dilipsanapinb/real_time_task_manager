import { Box, Button, FormControl, FormLabel, HStack, Heading,Input,Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const handleNavigate = () => {
        navigate('/signup')
    }
    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: 'Please Fill all the Feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const { data } = await axios.post('http://localhost:8002/user/login', { email, password }, config);
            // console.log(data);
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: true,
                position:'bottom',
            })
            localStorage.setItem('accesToken', JSON.stringify(data.accessToken));
            setLoading(false);
            navigate('/tasks')

        } catch (error) {
            console.log('Error occured at login user: ', error);
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    }
    return (
        <Box
            maxW='500px'
            margin='0 auto'
            padding='32px'
            border='1px solid #ccc'
            borderRadius='8px'
            boxShadow='lg'
            bg='while'
        >
            <Heading as='h1' size='lg' marginBottom='16px'>Login</Heading>
            <Text fontSize='lg' color='gray.500' >Welcome back! Log in with your creadentials.</Text>

            <FormControl marginBottom='16px' marginTop='10px'>
                <FormLabel >Email</FormLabel>
                <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel marginBottom='16px'>Password</FormLabel>
                <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            </FormControl>

            <Button colorScheme='blue' size='md' width='100%' marginTop='16px' marginBottom='16px' onClick={handleSubmit}>LOGIN</Button>
            <HStack spacing='4' justifyContent='center'>
                <Text fontSize='lg' color='gray.500'>
                    Don't have an account....?
                </Text>
                <Button
                    variant='link'
                    color='blue.500'
                    onClick={handleNavigate}
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </HStack>
        </Box>
    )
};
export default Login