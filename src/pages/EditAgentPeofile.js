import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'
import Navigation2 from "../navigations/Navigation2"
import { Card } from 'react-bootstrap';
import Popup from '../controls/Popup'
import { useNavigate } from 'react-router-dom'

import Navigation4 from "../navigations/Navigation4"

import Button from '@mui/material/Button';

const EditAgentProfile = () => {

    const [userName, setUserName] = useState("")
    const [address, setAddress] = useState("")
    const [image, setImage] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [userId, setUserId] = useState(0)
    const navigate = useNavigate();

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);

    
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);


    if (localStorage.getItem("userType") !== "agent") {
        navigate('/login')
    }


    const[promocount,setPromoCount]=useState("");
    const loadProfile = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getAgentById/" + localStorage.getItem("userId"));
            console.log(response.data)
            setUserName(response.data.users.userName);
            setAddress(response.data.users.address);
            setImage(response.data.users.image);
            setContactNumber(response.data.users.contactNumber);
            setUserId(response.data.users.userId);
            setPromoCount(response.data.promocount)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadProfile();
    }, []);

    const editProfile = () => {
        setShow1(true);
    }

    const [attachment, setAttachment] = useState(null);
    const saveAttachment = (e) => {
        setAttachment(e.target.files[0]);

    };

    const edit = async () => {
        var image1 = image;
        if (attachment != null) {
            var formData1 = new FormData();
            formData1.append("image", attachment);
            const resImage = await axios.post(
                "http://localhost:9000/users/saveImge",
                formData1
            );
            image1 = "http://localhost:9000/" + resImage.data;
        }



        var formData2 = new FormData();
        formData2.append("image", image1);
        formData2.append("userName", document.getElementById("userName").value);
        formData2.append("address", document.getElementById("address").value);
        formData2.append("contactNumber", document.getElementById("contactNumber").value);
        formData2.append("userId", userId);



        var a = await axios.post("http://localhost:9000/users/updateUser", formData2);
        alert(a.data)
        window.location.reload();



    }

    const getReport=()=>{
        setShow2(true);
    }
    return (
        <div>
            <Navigation4></Navigation4>

            <Popup
                show={show2}
                handleClose={handleClose2}
                title="Report for promo"
            >
              <p> used promo count :{promocount}</p> 
              <p>Collected Amount :1000Rs</p> 
            </Popup>    

            <Popup
                show={show1}
                handleClose={handleClose1}
                title="Edit Profile"
            >
                <label >Select Your Image</label>
                <br />
                <input id="image" type="file" onChange={saveAttachment} />
                <br />


                <label>UserName</label>
                <br />
                <textarea
                    type="text"
                    id="userName"
                    rows="1" cols="50"
                    defaultValue={userName}


                />
                <br />
                <label>Contact Number</label>
                <br />
                <textarea
                    type="text"
                    id="contactNumber"
                    rows="1" cols="50"
                    defaultValue={contactNumber}


                />
                <br />
                <label>Address</label>
                <br />
                <textarea
                    type="text"
                    id="address"
                    rows="1" cols="50"
                    defaultValue={address}


                />
                <br />
                <Button variant="contained" color="primary" style={{ width: 100 }}
                    onClick={() => edit()}>Edit </Button>

            </Popup>

            <Card style={{ width: 500, margin: '20px' }}>
                <img
                    src={image}
                    style={{ heigth: '200px', width: '150px', marginLeft: '150px' }}
                    alt="new"
                />
                <br /><br />
                <p style={{ marginLeft: '30px' }}>Name: {userName}</p>
                <p style={{ marginLeft: '30px' }}>ContactNumber: {contactNumber}</p>
                <p style={{ marginLeft: '30px' }}>Address: {address}</p>
                <Button variant="contained" color="primary" style={{ margin: '30px', width: '87%' }} onClick={() => editProfile()}>Edit Profile</Button>
                <Button variant="contained" color="primary" style={{ margin: '30px', width: '87%' }} onClick={() => getReport()}>Report</Button>

            </Card>


        </div>



    )

}

export default EditAgentProfile;