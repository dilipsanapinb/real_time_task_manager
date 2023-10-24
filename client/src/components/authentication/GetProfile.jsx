import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';

const GetProfile = (userId) => {
    const [user, setUser] = useState();
    useEffect(() => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('accesToken'));
            const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                };
        const fetchUserData = async() => {
            const { data } = await axios.get(`http://localhost:8002/user/${userId}`);
            console.log(data);
        }
        // fetchUserData();
        } catch (error) {
            console.log('Something went wrong at fetching the user profile');
        }
    })
    return (
        <>
            <Navbar />
            
        </>
    )
};

export default GetProfile