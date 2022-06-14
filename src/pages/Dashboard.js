import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import axios from "axios";

import Grid from '@mui/material/Grid';
import BarChart1 from './BarChart1';
import Navigation1 from "../navigations/Navigation1"

import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();
    if (localStorage.getItem("userType") !== "admin") {
        navigate('/login')
    }

    const [spCount, setSpCount] = useState(0);
    const [scCount, setScCount] = useState(0);
    const [agentCount, setAgentCount] = useState(0);



    const loadCount = async () => {
        try {
            const serviceProviderCount = await axios.get("http://localhost:9000/users/getServiceProviserCount");
            const serviceConsumerCount = await axios.get("http://localhost:9000/users/getServiceConsumerCount");
            const agentCount = await axios.get("http://localhost:9000/users/getAgentCount");
            setSpCount(serviceProviderCount.data)
            setScCount(serviceConsumerCount.data)
            setAgentCount(agentCount.data)
            // console.log(response.data)
            // setUserName(response.data.users.userName);
            // setAddress(response.data.users.address);
            // setImage(response.data.users.image);
            // setContactNumber(response.data.users.contactNumber);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadCount();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navigation1></Navigation1>

            <div className='split left'>
                <BarChart1 />
            </div>
            <div class="split right" >
                <Grid container spacing={3}>
                    <Grid item xs={2.9} >
                        <Item style={{ backgroundColor: "white", color: "black" }}>
                            <p>Agents Count</p>
                            <h1>{agentCount}</h1>
                            <br />

                        </Item>
                    </Grid>
                    <Grid item xs={2.9}>
                        <Item style={{ backgroundColor: "white", color: "black" }}>
                            <p>Service Provider Count</p>
                            <h1>{spCount}</h1>
                            <br />
                        </Item>
                    </Grid>
                    <Grid item xs={2.9}>
                        <Item style={{ backgroundColor: "white", color: "black" }}>
                            <p>Service Consumer Count</p>
                            <h1>{scCount}</h1>
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );

}
export default DashBoard;