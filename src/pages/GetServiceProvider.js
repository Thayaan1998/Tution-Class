import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '../controls/Input'
import SearchIcon from '@mui/icons-material/Search';
import Popup from '../controls/Popup'
import Navigation2 from "../navigations/Navigation2"
import { useNavigate } from 'react-router-dom'

const GetServiceProvider = () => {

    const navigate = useNavigate();
    const [serviceProviders, SetServiceProviders] = useState([]);
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState(0);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);


    const handleChange1 = e => setLocation(e.target.value);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    

    if (localStorage.getItem("userType") !== "serviceConsumer") {
        navigate('/login')
    }





    const loadServiceProviders = async (location, category) => {
        try {

            const response = await axios.get("http://localhost:9000/users/getServiceProvicer1/" + location + "," + category);
            console.log(response.data);
            SetServiceProviders(response.data)



        } catch (error) {
            console.log(error);
        }

    }



    const loadLocations = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getBranches");
            setLocations(response.data)


        } catch (error) {
            console.log(error);
        }

    }


    // useEffect(() => {
    //     loadServiceProviders();
    // }, []);

    useEffect(() => {
        loadLocations();
    }, []);


    const viewProfile = (users) => {
        console.log(users)
       
        setName(users.userName)
        setEmail(users.email)
        setContactNumber(users.contactNumber)
        setAddress(users.address)
        setShow1(true)
        setImage(users.image)




    }

    const serach = async () => {
        // console.log(document.getElementById("category").value)
        // console.log(location);

        if (document.getElementById("category").value === '' && location == 0) {
            return;
        }



        await loadServiceProviders(location, document.getElementById("category").value)
    }

    return (
        <div>
            <Navigation2></Navigation2>

            <Popup
                show={show1}
                handleClose={handleClose1}
                title="Profile Details"
            >
                <img
                    src={image}
                    style={{ heigth: '200px', width: '150px', marginLeft: '150px' }}
                    alt="new"
                />
                <p >Name: {name}</p>
                <p >Email: {email}</p>
                <p >Address: {address}</p>
                <p >Contact Number: {contactNumber}</p>


            </Popup>
            <Box
                sx={{
                    width: 500,
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: "20px"
                }}
            >
                <select value={location} onChange={handleChange1} class="form-select" style={{ margin: '30px', width: '200px' }} aria-label="Default select example">
                    <option key='0' value='0'>Select Location</option>
                    {locations.map(item => {
                        return (<option key={item.branchId} value={item.branchId}>{item.branchName}</option>);
                    })}
                </select>
                <input
                    type="text"
                    id="category"


                />

                <Button variant="contained" color="primary" style={{ width: 250, margin: '10px' }}
                    onClick={() => serach()}><SearchIcon></SearchIcon></Button>
            </Box>

            <div >
                {
                    serviceProviders.map((row) => {

                        return (


                            <Card style={{ width: 500, margin: '20px' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <Card.Body>
                                            <Card.Text>
                                                <b>{row.users.userName}</b>
                                            </Card.Text>
                                            <Card.Text>
                                                <Rating name="read-only" value={row.rating} readOnly />
                                            </Card.Text>
                                            <Card.Text>
                                                {row.category}
                                            </Card.Text>
                                            {/* <Button variant="primary">Go somewhere</Button>  */}
                                        </Card.Body>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card.Body>
                                            <Button variant="contained" color="primary" style={{ width: 200, margin: '10px' }}
                                                onClick={() => viewProfile(row.users)}>View Profile</Button>
                                            <Button variant="contained" color="primary" style={{ width: 200, margin: '10px' }}>Chat</Button>
                                        </Card.Body>
                                    </Grid>
                                </Grid>



                            </Card>


                        )
                    })
                }
            </div>

        </div>
    );

};

export default GetServiceProvider;