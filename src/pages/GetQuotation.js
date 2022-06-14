import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'
import Navigation2 from "../navigations/Navigation2"
import { Card } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';

const GetQuotation = () => {


    const [quotations, setQuotations] = React.useState([]);

    const navigate = useNavigate();
    if (localStorage.getItem("userType") !== "serviceConsumer") {
        navigate('/login')
    }

    const loadQuotation = async () => {
        try {

            const response = await axios.get("http://localhost:9000/postrequirement/getQuatation/"+localStorage.getItem("userId"));
            console.log(response.data);
            setQuotations(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadQuotation();
    }, []);
    return (
        <div >
            <Navigation2></Navigation2>

            {
                quotations.map((row) => {
                    return (

                        <Card style={{ width: 500, margin: '20px' }}>

                            <Card.Body>
                                <Card.Text>
                                    <b>Message</b>
                                </Card.Text>
                                <Card.Text>
                                    {row.message}
                                </Card.Text>

                                <Card.Text>
                                    <b>Quotation Details</b>
                                </Card.Text>
                                <Card.Text>
                                    {row.postRequirement.requirementDetails}- {row.postRequirement.category}
                                </Card.Text>

                                <Card.Text>
                                    <b>Made Quotation Service Provider Details</b>
                                </Card.Text>

                                <Card.Text>
                                    {row.serviceConsumer.users.userName}-{row.serviceConsumer.users.email}-{row.serviceConsumer.users.contactNumber}
                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button>  */}

                            </Card.Body>


                        </Card>


                    )
                })
            }
        </div>
    );
}
export default GetQuotation;