import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'
import Navigation3 from "../navigations/Navigation3"
import { Card } from 'react-bootstrap';
import Popup from '../controls/Popup'
import { useNavigate } from 'react-router-dom'


import Button from '@mui/material/Button';



const EditProfileServiceProvider = () => {

    const [userName, setUserName] = useState("")
    const [address, setAddress] = useState("")
    const [image, setImage] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [userId, setUserId] = useState(0)
    const navigate = useNavigate();

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);

    if (localStorage.getItem("userType") !== "serviceProvider") {
        navigate('/login')
    }

    const [package1, setPackage1] = useState("")

    const [status1, setStatus1] = useState("")


    const loadPackage = async () => {
        try {

            const response = await axios.get("http://localhost:9000/subscribe/getSubscribe/" + localStorage.getItem("userId"));
            console.log(response.data);
            setPackage1(response.data)

            setStatus1(response.data.status)
            // setQuotations(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadPackage();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getServiceProviderById/" + localStorage.getItem("userId"));
            console.log(response.data)
            setUserName(response.data.users.userName);
            setAddress(response.data.users.address);
            setImage(response.data.users.image);
            setContactNumber(response.data.users.contactNumber);
            setUserId(response.data.users.userId)
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
        localStorage.setItem("theme", "theme2");

        window.location.reload();



    }
    const colorMode = React.useMemo(
        () => ({
            toggleThemeMode: () => {




            }
        }),
        [],
    );

    const subscribe=async()=>{
        try {
            var formData2 = new FormData();

            formData2.append("status", "unsubscribed");
            formData2.append("subscribeId",package1.subscribeId);
            const response = await axios.post("http://localhost:9000/subscribe/updateSubscribe",formData2 );
            console.log(response.data);
            // setPackage1(response.data)

            // setStatus1(response.data.status)
            // setQuotations(response.data)
            window.location.reload();


        } catch (error) {
            console.log(error);
        }

    }

    const changeTheme = () => {

        if (document.getElementById("theme").value == "theme1") {
            localStorage.setItem("theme", "theme1");
        } else if (document.getElementById("theme").value == "theme2") {
            localStorage.setItem("theme", "theme2");
        } else if (document.getElementById("theme").value == "theme3") {
            localStorage.setItem("theme", "theme3");
        }
        window.location.reload();
    }
    return (
        <div>
            <Navigation3></Navigation3>

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
            </Card>

            <Card style={{ width: 500, margin: '20px' }}>
                <label style={{ margin: '30px', width: '87%' }}>Change Theme</label>
                <select class="form-select" aria-label="Default select example" style={{ margin: '30px', width: '87%' }} id="theme" onClick={colorMode.toggleThemeMode}>
                    <option selected>Open this select menu</option>
                    <option value="theme1">blue</option>
                    <option value="theme2">purple</option>
                    <option value="theme3">pink</option>
                </select>
                <Button variant="contained" color="primary" onClick={() => changeTheme()} style={{ margin: '30px', width: '87%' }}>
                    Change Theme
                </Button>

                {status1 === "subscribed" ? (

                    <Button variant="contained" color="primary" onClick={() => subscribe()} style={{ margin: '30px', width: '87%' }}>
                       Subscribe
                    </Button>
                ) : (

                    <p>No Subscription</p>

                )}
            </Card>


        </div>



    )

}

export default EditProfileServiceProvider;