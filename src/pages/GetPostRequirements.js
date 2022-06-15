import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from 'react-bootstrap';
import { requestForToken, onMessageListener } from './firebase'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Popup from '../controls/Popup'

import Navigation3 from "../navigations/Navigation3"
import { useNavigate } from 'react-router-dom'


const GetPostRequirements = () => {
    const navigate = useNavigate();
    const [PostRequirement, SetPostRequirement] = useState([]);

    const [show1, setShow1] = useState(false);

    const [show2, setShow2] = useState(false);


    const [requirementId, setRequirementId] = useState(0);

    const [serviceConsumerId, setServiceConsumerId] = useState(0);

    if (localStorage.getItem("userType") !== "serviceProvider") {
        navigate('/login')
    }

    const [package1, setPackage1] = useState("")


    const loadPackage = async () => {
        try {

            const response = await axios.get("http://localhost:9000/subscribe/getSubscribe/" + localStorage.getItem("userId"));
            console.log(response.data);
            setPackage1(response.data)

            

          
            // setQuotations(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadPackage();
    }, []);
    const handleClose1 = () => setShow1(false);

    const handleClose2 = () => setShow2(false);


    const loadRequirements = async () => {
        try {

            const response = await axios.get("http://localhost:9000/postrequirement/getPostRequirements");
            console.log(response.data);
            SetPostRequirement(response.data)




        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadRequirements();
    }, []);

    //requestForToken();

    onMessageListener()
        .then((payload) => {
            //setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     

        })

    const openQuotation = (requirementId, serviceConsumerId) => {
       
        if(package1!=''){
           if (package1.quotationcount!=0){
            setShow1(true)
            setRequirementId(requirementId)
            setServiceConsumerId(serviceConsumerId)
           }else{
            alert("you can't send quotation")
           }
        }else{
            alert("you didn't subscribed yet")
        }
       
    }

    const makeQuotation = async () => {

        var values = {
            quotationId: 0,
            message: document.getElementById("message").value,
            postRequirement: {
                requirementId: requirementId
            },
            serviceConsumer: {
                serviceConsumerId: serviceConsumerId
            },
            serviceProvider: {
                serviceProviderId: localStorage.getItem("userId")
            }

        }

        
        var a1 = await axios.post("http://localhost:9000/postrequirement/postQuatation", values);
        var a2 = await axios.get("http://localhost:9000/postrequirement/postQuatation/"+package1.subscribeId);
        alert(a2.data);


        setShow1(false);



    }

    return (
        <div>
            <Navigation3></Navigation3>

            <Popup
                show={show1}
                handleClose={handleClose1}
                title="Make Quotation"
            >
                <textarea
                    type="text"
                    id="message"
                    rows="4" cols="50"


                />
                <br />

                <Button variant="contained" color="primary" style={{ width: 250, margin: '10px' }}
                    onClick={() => makeQuotation()}>Make Quotation</Button>

            </Popup>

            <Popup
                show={show2}
                handleClose={handleClose2}
                title="Make Quotation"
            >
             
            </Popup>

            <div >
                {
                    PostRequirement.map((row) => {
                        return (

                            <Card style={{ width: 500, margin: '20px' }}>

                                <Card.Body>
                                    <Card.Text>
                                        <b>{row.category}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        {row.email}
                                    </Card.Text>
                                    <Card.Text>
                                        {row.branch.branchName}
                                    </Card.Text>
                                    <Card.Text>
                                        {row.phonenumber}
                                    </Card.Text>
                                    <Card.Text>
                                        {row.requirementDetails}
                                    </Card.Text>
                                    {/* <Button variant="primary">Go somewhere</Button>  */}
                                    <Button variant="contained" color="primary" style={{ width: 200, margin: '10px' }}
                                        onClick={() => openQuotation(row.requirementId, row.serviceConsumer.serviceConsumerId)}>Make Quotation</Button>
                                </Card.Body>


                            </Card>


                        )
                    })
                }
            </div>

        </div>
    );

};

export default GetPostRequirements;