import { Avatar,Box, Flex,IconButton, Drawer, DrawerOverlay, DrawerHeader, DrawerContent, DrawerBody, Stack,Text, Badge,Link as ChakraLink, Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {HamburgerIcon} from '@chakra-ui/icons'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate()
    const taggleDrawer = () => {
        setIsOpen(!isOpen);
    }
    const handleLogout = () => {
        localStorage.removeItem('accesToken');
        navigate('/')
    }
    const userName = "Dilip Sanap";
    const userInitials = userName.split(' ').map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join('');
    const isActive = true;
    return (
        <Flex
            as={'nav'}
            align={'center'}
            padding={4}
            bg={'blue.500'}
            color={'white'}
        >
            <IconButton
                aria-label="Open Drawer"
                icon={<HamburgerIcon />}
                onClick={taggleDrawer}
                display={{ base: 'block', md: 'node' }}
            />
            <Link to='/'>
                <Box cursor='pointer' alignItems={'center'} marginLeft={10}>
                    <Text
                        fontFamily={'sans-serif'}
                        fontSize={30}
                        fontWeight={'bold'}
                    >
                        Task Manager
                    </Text>
                </Box>
            </Link>
            
            <Drawer isOpen={isOpen} placement="left" size="xs" onClose={taggleDrawer}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>User Navigation</DrawerHeader>
                        <Flex align={'center'}>
                            <Avatar name={userInitials} src='' />
                            <Box ml='3'>
                                <Text fontWeight={'bold'}>
                                    {userName}
                                </Text>
                                <Badge colorScheme={isActive ? 'green' : 'red'}>{isActive ? 'Active' : "Inactive"}</Badge>
                            </Box>
                        </Flex>
                        <DrawerBody marginTop={'10'}>
                            <Stack spacing={4}>
                                <ChakraLink as={Link} to="/tasks" fontSize="lg" color="blue.500">
                                    Tasks
                                </ChakraLink>
                                <ChakraLink as={Link} to="/assign-tasks" fontSize="lg" color="blue.500">
                                    Assign Tasks
                                </ChakraLink>
                                <ChakraLink as={Link} to="/completed-tasks" fontSize="lg" color="blue.500">
                                    Completed Tasks
                                </ChakraLink>
                                <ChakraLink as={Link} to="/profile" fontSize="lg" color="blue.500">
                                    Profile
                                </ChakraLink>
                                <Button variant={'outline'} colorScheme='red' onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Flex>
    )
};
export default Navbar