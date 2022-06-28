import React, { useState, useEffect } from "react";

import Navigation3 from "../navigations/Navigation3"
import axios from "axios";

import { ButtonToolbar, Card } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '../controls/Input'

import Grid from '@mui/material/Grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom'
import { WindowSharp } from "@mui/icons-material";

const GetQuestions = () => {

    const [question, setQuestion] = React.useState([]);

    const navigate = useNavigate();
    if (localStorage.getItem("userType") !== "serviceProvider") {
        navigate('/login')
    }

    const loadQuestions = async () => {
        try {

            const response = await axios.get("http://localhost:9000/questions/getQuestions/"+localStorage.getItem("userId"));
            console.log(response.data);
            setQuestion(response.data)


        } catch (error) {
            console.log(error);
        }

    }
    // const attachment =(attachment)=>{
      
    //     window.open('http://localhost:9000/'+attachment);
    // }

    useEffect(() => {
        loadQuestions();
    }, []);
    return (
        <div >
            <Navigation3></Navigation3>

            {
                question.map((row) => {
                    return (

                        <Card style={{ width: 500, margin: '20px' }}>

                            <Card.Body>
                                <Card.Text>
                                    <b>{row.inqueringAbout.name}</b>
                                </Card.Text>
                                <Card.Text>
                                    {row.description}
                                </Card.Text>

                                <Card.Text>
                                     {row.serviceConsumer.users.userName} ||  {row.serviceConsumer.users.email}  ||   {row.serviceConsumer.users.contactNumber}
                                </Card.Text>
                               

                              

                               
                                {/* <Button variant="contained" color="primary" onClick={()=>attachment(row.attachments)}>Get Attachment</Button>  */}

                            </Card.Body>


                        </Card>


                    )
                })
            }
        </div>
    );
}
export default GetQuestions;