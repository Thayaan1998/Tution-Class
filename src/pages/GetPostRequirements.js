import React, { useState, useEffect } from "react";
import axios from "axios";
import {Card} from 'react-bootstrap';  
import {requestForToken,onMessageListener} from './firebase'


const GetPostRequirements = () => {

    const [PostRequirement, SetPostRequirement] = useState([]);
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

    return (
        <div>

            <div >
                {
                    PostRequirement.map((row) => {

                        return (

                            <Card style={{ width: '18rem', margin:'20px' }}>
                            
                                <Card.Body>
                                    <Card.Text>
                                      <b>{row.category}</b> 
                                    </Card.Text>
                                    <Card.Text>
                                       {row.location}
                                    </Card.Text>
                                    <Card.Text>
                                       {row.requirementDetails}
                                    </Card.Text>
                                    {/* <Button variant="primary">Go somewhere</Button> */}
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