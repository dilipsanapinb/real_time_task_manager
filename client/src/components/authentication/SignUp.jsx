import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Box, Button, FormControl, FormLabel, HStack, Heading,Input,InputGroup,InputRightElement,Select,Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [securityCode, setSecurityCode] = useState('')
    const navigate = useNavigate();
    const toast = useToast();
    const handleNavigate = () => {
        navigate('/')
    }

    // handleCkick show and hide the password
    const handleCkick = () => setShow(!show);
    
    // register user
    const handleRegister = async () => {
        setLoading(true);
        if (!username || !role || !email || !password) {
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

        // verify the security code if the user selects the 'admin' role
        if (role === 'admin' && securityCode !== 'Verify989693@sEcutirY') {
            toast({
                title: 'Invalid Security Code',
                description: 'You must provide a valid security code to become an admin.',
                status: 'error',
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
            await axios.post
                ('http://localhost:8002/user/register',
                    { username, email, password, role },
                    config);
            // console.log(data);
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            navigate('/')
        } catch (error) {
            console.log('Error occured at registering the user: ', error);
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
    };
    return (
        <>
            <Navbar />
            <Box margin={'10'}>
                <Box
                    maxW='500px'
                    margin='0 auto'
                    padding='32px'
                    border='1px solid #ccc'
                    borderRadius='8px'
                    boxShadow='lg'
                    bg='while'
                >
                    <Heading as='h1' size='lg' marginBottom='16px'>Sign up</Heading>
                    <Text fontSize='lg' color='gray.500' >Welcome back! Sign up with your creadentials.</Text>

                    <FormControl marginBottom='16px' marginTop='10px'>
                        <FormLabel >Full Name</FormLabel>
                        <Input type='text' placeholder='Full Name' value={username} onChange={(e) => setUserName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select placeholder='Select type of user-role' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </Select>
                    </FormControl>
                    {role === 'admin' && (
                        <FormControl marginBottom='16px' marginTop='10px'>
                            <FormLabel>Security Code</FormLabel>
                            <Input
                                type='password'
                                placeholder='Security Code'
                                value={securityCode}
                                onChange={(e) => setSecurityCode(e.target.value)}
                            />
                        </FormControl>
                    )}
                    <FormControl marginBottom='16px' marginTop='10px'>
                        <FormLabel >Email</FormLabel>
                        <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel marginBottom='16px'>Password</FormLabel>
                        {/* enter the password */}
                        <InputGroup>
                            <Input
                                // if show then show the text else show the password format
                                type={show ? 'text' : 'password'}
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Input>
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleCkick}>
                                    {/* toggle the sow and hide */}
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        colorScheme='blue'
                        size='md'
                        width='100%'
                        marginTop='16px'
                        marginBottom='16px'
                        onClick={handleRegister}
                        isLoading={loading}
                    >REGISTER</Button>
                    <HStack spacing='4' justifyContent='center'>
                        <Text fontSize='lg' color='gray.500'>
                            Allready registered....?
                        </Text>
                        <Button variant='link' color='blue.500' onClick={handleNavigate}>
                            Log in
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </>
    )
};

export default SignUp