import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import Grid from '@mui/material/Grid';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Navigation4 from "../navigations/Navigation4"

import { useNavigate } from 'react-router-dom'


const SendPromo = () => {
    const [serviceProviders, setServiceProviders] = React.useState([]);

    const [serviceProvider, setServiceProvider] = useState('');

    const navigate = useNavigate();
    if (localStorage.getItem("userType") !== "agent") {
        navigate('/login')
    }


    const handleChange = (e) => {

        setServiceProvider(e.target.value);
        console.log(e.target.value)
    }

    const [promoCode, SetPromoCode] = useState("")
    const loadProfile = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getAgentById/" + localStorage.getItem("userId"));
            console.log(response.data)
            SetPromoCode(response.data.promoCode)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadProfile();
    }, []);





    const loadServiceProviders = async () => {
        try {
            const response = await axios.get("http://localhost:9000/servicePromo/getServiceProviders");
            console.log(response.data);
            setServiceProviders(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(document.getElementById("id1").value)


            let values = {
                serviceproviderWithPromoId: 0,
                serviceproviderId: document.getElementById("id1").value,
                agentId: localStorage.getItem("userId")
            }
            const headers = {
                'Content-Type': 'application/json'
            };
            var res2 = await axios.post("http://localhost:9000/servicePromo/postPromos", values, { headers });
            alert(res2.data);
        } catch (ex) {
            console.log(ex);
        }


    }

    const sendPromo=async ()=>{
        try {
            const response = await axios.get("http://localhost:9000/servicePromo/sendPromo/"+document.getElementById("email").value+","+promoCode);
            console.log(response.data);
            alert(response.data);
            //setServiceProviders(response.data)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadServiceProviders();
    }, []);
    return (
        <div
        >
            <Navigation4></Navigation4>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4} >
                    {/* <Card style={{ width: '18rem', margin: '20px' }}>
                        <Card.Body>
                            <Card.Text>
                                <b>{row.name}</b>
                            </Card.Text>

                            <Card.Text>
                                {row.review}
                            </Card.Text>
                        <Card.Body>
                    </Card> */}
                    <Card style={{ width: '30rem', margin: '20px' }}>
                        <Card.Body>
                            <Card.Text>
                                {/* <img src={require('')} /> */}

                                <b>Name:</b> Thayaan
                            </Card.Text>
                            <Card.Text>
                                <b>Age:</b> 21
                            </Card.Text>
                            <Card.Text>
                                <b>Location:</b> Kotehena
                            </Card.Text>
                            <Card.Text>
                                <b> Experience:</b> 2 Years
                            </Card.Text>
                            <Card.Text>
                                <b>Degree:</b> BE Eng
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={8}>
                    <Card style={{ width: '60rem', margin: '20px' }}>
                        {/* <form onSubmit={handleSubmit} autoComplete="off"> */}

                            <Card.Text>
                                <b>Degree:</b> BE Eng
                            </Card.Text>

                            <textarea
                                type="text"
                                id="email"
                                rows="1" cols="30"
                                placeholder="send email"
                            />

                            <Button variant="contained" color="primary" style={{ margin: '30px' }} onClick={()=>{sendPromo()}}>Send Promo</Button>
                        {/* </form> */}
                    </Card>

                </Grid>
            </Grid>

        </div>
    );


}
export default SendPromo;
