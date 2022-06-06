import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Popup from '../controls/Popup'
import EditProfile from "./EditProfile";


const Profile = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () =>{

        setProfileData({
            name:document.getElementById("name").innerHTML,
            age:document.getElementById("age").innerHTML
        })
        setShow(true);
    } 
    const [profileData, setProfileData] = useState({});

    const handleClose1 = (profile) => {
        console.log(profile);
        setShow(false);
        document.getElementById("name").innerHTML=profile.name;
        document.getElementById("age").innerHTML=profile.age;

           

        // setTheArray([...theArray, customer]);
        // setIdIncrement(idIncrement + 1);

    }
    return (
        <div>
            <Popup
                show={show}
                handleClose={handleClose}
                title="Edit Profile"
            >
                <EditProfile
                    handleClose1={handleClose1}
                    profileData={profileData}
                />
            </Popup>
            <Card style={{ width: '30rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Text >
                      <h1  id="name"> Thayaan</h1> 
                    </Card.Text>
                    <Card.Text >
                       <p id="age">21</p> 
                    </Card.Text>
                    <Card.Text id="services">
                        shshshhs,hsjsjsj,sjjsjsjsj,jsjsj
                    </Card.Text>
                    <Button variant="contained" color="primary" onClick={() => handleShow()}><ModeEditIcon /> Edit</Button>

                </Card.Body>
            </Card>
        </div>
    );
}

export default Profile;