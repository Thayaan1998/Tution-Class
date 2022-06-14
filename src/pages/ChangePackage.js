import React, { useState, useEffect } from "react";

import Navigation1 from "../navigations/Navigation1"
import axios from "axios";

import { ButtonToolbar, Card } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '../controls/Input'

import Grid from '@mui/material/Grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom'


const ChangePackage = () => {
    const [editing, setEditing] = useState(false);
    const [buttonText, setButtonText] = useState("Edit");

    const navigate = useNavigate();
    if (localStorage.getItem("userType") !== "admin") {
        navigate('/login')
    }
    const [package1, setPackage1] = useState(1);



    const handleChange1 = async (e) => {
        setPackage1(e.target.value);

        await loadPackage(e.target.value);

    }

    const [input, setInput] = useState({
        packageName: "",
        packagePrice: "",
        packageDescription: ""

    })


    const change = async () => {

        if (editing == false) {
            setEditing(true);
            // document.getElementById("packageDescription").innerHTML=packageDescription
            // document.getElementById("packageName").innerHTML=packageName
            // document.getElementById("packagePrice").innerHTML=packagePrice

            setButtonText("Save")
        } else {

            console.log(input.packageName)

            try {
                const response = await axios.get("http://localhost:9000/users/updatePackage/"
                    + input.packageName + ","
                    + input.packagePrice + ","
                    + input.packageDescription + ","
                    + package1);
                // setServiceProviders(response.data);
                console.log(response.data)
                await loadPackage(package1)



            } catch (error) {
                console.log(error);
            }

            setEditing(false);

            setButtonText("Edit")

        }

    }


    const loadPackage = async (id) => {
        try {
            const response = await axios.get("http://localhost:9000/users/getPackage/" + id);
            // setServiceProviders(response.data);
            console.log(response.data)


            setInput({
                packageName: response.data[1],
                packagePrice: response.data[6],
                packageDescription: response.data[7]
            }
            )


        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        loadPackage(1);
    }, []);

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })

       


    }

    return (
        <div>
            <Navigation1></Navigation1>

            <select value={package1} class="form-select" onChange={handleChange1} aria-label="Default select example"  style={{ width: 500, margin: '20px' }} id="theme" >
                <option value="1">Gold</option>
                <option value="2">Platinum</option>
                <option value="3">Silver</option>
            </select>
            <Card style={{ width: 500, margin: '20px' }}>

                <Box
                    sx={{
                        width: 500,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >


                    <Card.Text>
                        {editing ? (

                            <p>Package Price :   <Input id="packageName" handleInputChange={handleInputChange} name="packageName" style={{ marginRight: '20px' }} value={input.packageName} /></p>

                        ) : (

                            <p>Package Name :  {input.packageName}</p>

                        )}
                    </Card.Text>



                </Box>
                <Box
                    sx={{
                        width: 500,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >

                    <Card.Text>
                        {editing ? (
                            <p>Package Price : <Input id="packagePrice" handleInputChange={handleInputChange} name="packagePrice" style={{ marginRight: '20px' }} value={input.packagePrice} /></p>

                        ) : (

                            <p>Package Price :  {input.packagePrice}</p>

                        )}
                    </Card.Text>
                </Box>

                <Box
                    sx={{
                        width: 500,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >

                    <Card.Text>
                        {editing ? (
                            <p>Package Description : <Input id="packageDescription" handleInputChange={handleInputChange} name="packageDescription" style={{ marginRight: '20px' }} value={input.packageDescription} /></p>

                        ) : (

                            <p>Package Description :  {input.packageDescription}</p>

                        )}
                    </Card.Text>
                </Box>
                <Button variant="contained" color="primary" style={{ margin: '5px', width: '100px' }} onClick={() => change()} >
                    {buttonText}
                </Button>

            </Card>

        </div>
    );
}
export default ChangePackage;