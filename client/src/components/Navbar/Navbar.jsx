import { Box, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    // const navigate = useNavigate();
    // const handleNavigate = () => {
    //     navigate('/signup')
    // }
    return (
        <Flex
            as={'nav'}
            align={'center'}
            justify={'space-between'}
            padding={4}
            bg={'blue.500'}
            color={'white'}
        >
            <Link to='/'>
            <Box cursor='pointer'>
                <strong>
                    Task Manager
                </strong>
            </Box>
            </Link>
            
            <Spacer />
            <Box>
                {/* <Button colorScheme='white' variant='outline' cursor={'pointer'} onClick={handleNavigate}>
                    Sign Up
                </Button> */}
            </Box>
        </Flex>
    )
};

export default Navbar