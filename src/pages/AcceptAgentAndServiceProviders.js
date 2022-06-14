
import React, { useState, useEffect } from "react";

import Navigation1 from "../navigations/Navigation1"
import axios from "axios";

import { Card } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'

const AcceptAgentAndServiceProviders = () => {

    const [agents, setAgents] = useState([]);
    const [serviceProviders, setServiceProviders] = useState([]);

    const navigate = useNavigate();
    if (localStorage.getItem("userType") !== "admin") {
        navigate('/login')
    }


    const loadServiceProviders = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getServiceProviders");
            setServiceProviders(response.data);
            console.log(response.data)


        } catch (error) {
            console.log(error);
        }

    }
    const loadAgents = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getAgents");
            setAgents(response.data)
            console.log(response.data)




        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        loadServiceProviders();
    }, []);

    useEffect(() => {
        loadAgents();
    }, []);


    const acceptPromos = async (url, agentId, userId, result) => {
        if (window.confirm("Do you want to " + result + " the status")) {
            try {
                const headers = {
                    'Content-Type': 'application/json'
                };
                var b = await axios.get("http://localhost:9000/users/" + url + "/" + result + "," + agentId + "," + userId, { headers });

                alert(b.data);
                loadAgents();
                loadServiceProviders();



            } catch (error) {
                console.log(error);
            }
        }

    }
    return (
        <div>

            <Navigation1></Navigation1>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <h3 style={{ margin: '20px' }}>Agents</h3>
                    {

                        agents.map((row) => {
                            return (

                                <Card style={{ width: '18rem', margin: '20px' }}>
                                    <Card.Text style={{ margin: '5px' }}>
                                        <b> {row.users.userName}</b>
                                    </Card.Text>

                                    <Card.Text style={{ margin: '5px' }}>
                                        {row.users.email}
                                    </Card.Text>
                                    <Card.Text style={{ margin: '5px' }}>
                                        {row.users.contactNumber}
                                    </Card.Text>
                                    <Box
                                        sx={{
                                            width: 200,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button variant="contained" color="primary" style={{ margin: '5px', width: '100px' }} onClick={() => acceptPromos("updateAgent", row.agentId, row.users.userId, "Accepted")}>Accept</Button>
                                        <Button variant="contained" color="secondary" style={{ margin: '5px', width: '100px' }} onClick={() => acceptPromos("updateAgent", row.agentId, row.users.userId, "Rejected")}>Reject</Button>

                                    </Box>

                                </Card>
                            )
                        })

                    }
                </Grid>
                <Grid item xs={6}>
                    <h3 style={{ margin: '20px' }}>Service Providers</h3>

                    {

                        serviceProviders.map((row) => {
                            return (

                                <Card style={{ width: '18rem', margin: '20px' }}>
                                    <Card.Text style={{ margin: '5px' }}>
                                        <b> {row.users.userName}</b>
                                    </Card.Text>

                                    <Card.Text style={{ margin: '5px' }}>
                                        {row.users.email}
                                    </Card.Text>
                                    <Card.Text style={{ margin: '5px' }}>
                                        {row.users.contactNumber}
                                    </Card.Text>
                                    <Box
                                        sx={{
                                            width: 200,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button variant="contained" color="primary" style={{ margin: '5px', width: '100px' }} onClick={() => acceptPromos("updateServiceProvider", row.serviceProviderId, row.users.userId, "Accepted")}>Accept</Button>
                                        <Button variant="contained" color="secondary" style={{ margin: '5px', width: '100px' }} onClick={() => acceptPromos("updateServiceProvider", row.serviceProviderId, row.users.userId, "Rejected")}>Reject</Button>

                                    </Box>

                                </Card>
                            )
                        })

                    }
                </Grid>
            </Grid>

        </div>
    )

}

export default AcceptAgentAndServiceProviders;