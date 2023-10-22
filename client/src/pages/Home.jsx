import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/authentication/Login';
import { Flex } from '@chakra-ui/react';

const Home = () => {
    return (
        <>
            <Navbar />
            <Flex  margin={'20'}>
                <Login/>
            </Flex>
            
        </>
    )
};

export default Home