import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'

import AddOTPNumber from "./AddOTPNumber";
import Popup from '../controls/Popup'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Login = () => {
    // const [userType, setUserType] = React.useState('');

    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const [otpNumber, setOtpNumber] = useState(1);


    const handleClose = () => setShow(false);


    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."

        if ('email' in fieldValues)
            if (!fieldValues.email) {
                temp.email = "This field is required."
            } else if (!(/$^|.+@.+..+/).test(fieldValues.email)) {
                temp.email = "This email is not valuable."
            } else {
                temp.email = ""
            }


        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }

    // const handleChange = e => setUserType(e.target.value);

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }




    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {

            var values = {
                userId: 0,
                userName: "",
                email: input.email,
                address: "",
                contactNumber: "",
                postcode: "",
                password: input.password,
                userTypeId: ""
            }

            try {
                const headers = {
                    'Content-Type': 'application/json'
                };

                var a = await axios.post("http://localhost:9000/users/login", values, { headers });

                console.log(a.data);
                if (a.data != "Not valid username or password") {
                    setOtpNumber(a.data)
                    setShow(true)
                }



                // alert(a.data);
            } catch (ex) {
                console.log(ex)
            }
        }

    }


    return (
        <div
        >
            <Popup
                show={show}
                handleClose={handleClose}
                title="Add OtpNumber"
            >
                <AddOTPNumber

                    otpNumber={otpNumber}

                />
            </Popup>




            <div style={{ marginTop: "48px", float: 'left', marginLeft: "550px" }}>
                <Card sx={{ height: 400, width: 400 }}>
                    <CardContent>
                        <h3 style={{ marginLeft: '20px' }}>Welcome To Service Hub</h3>

                        <form onSubmit={handleSubmit} autoComplete="off">



                            <Input
                                id="email"
                                value={input.email}
                                handleInputChange={handleInputChange}
                                placeholder="Enter Email......"
                                errors={errors.email}
                            />


                            <Input
                                id="password"
                                value={input.password}
                                handleInputChange={handleInputChange}
                                placeholder="Enter password......"
                                errors={errors.password}
                            />

                            <button type="submit" class="btn btn-primary" style={{ margin: '30px', width: '84%' }}>Login</button>

                        </form>


                    </CardContent>
                </Card>
            </div>


        </div>
    );


}
export default Login;
