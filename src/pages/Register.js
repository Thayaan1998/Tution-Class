import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Popup from '../controls/Popup'

import Button from '@mui/material/Button';
import { WindowSharp } from "@mui/icons-material";

import { useNavigate } from 'react-router-dom'
import { encryptPassword, decryptPassword } from "./decryptAndEncrypt"
import Navigation5 from "../navigations/Navigation5"


const Register = () => {
    const [userType, setUserType] = React.useState(1);

    const [branches, setBranches] = React.useState([]);

    const [branch, setBranch] = React.useState(1);



    const [show1, setShow1] = useState(false);

    const [show2, setShow2] = useState(false);

    const [show3, setShow3] = useState(false);



    const handleClose1 = () => setShow1(false);

    const handleClose2 = () => setShow2(false);

    const handleClose3 = () => setShow3(false);



    const navigate = useNavigate();


    const [input, setInput] = useState({
        email: "",
        userName: "",
        address: "",
        postcode: "",
        contactNumber: "",
        password: "",
    })

    const [errors, setErrors] = useState({});

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
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."

        if ('contactNumber' in fieldValues)
            temp.contactNumber = fieldValues.contactNumber.length > 9 ? "" : "The length should be 10"

        if ('postcode' in fieldValues)
            temp.postcode = fieldValues.postcode ? "" : "This field is required."

        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }

    const handleChange = e => setUserType(e.target.value);

    const handleChange1 = e => setBranch(e.target.value);


    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }


    const [UserTypes, setUserTypes] = useState([]);
    const loadUserTypes = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getUserTypes");
            setUserTypes(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    const loadBranches = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getBranches");
            setBranches(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {
            if (userType == 1) {
                setShow1(true);
            } else if (userType == 2) {
                setShow3(true);
            } else {
                setShow2(true);
            }
        }

    }

    const [attachment, setAttachment] = useState();
    const saveAttachment = (e) => {
        setAttachment(e.target.files[0]);

    };

    const makeRegister = async (e) => {
        // console.log(document.getElementById("companyName").value)

        if (userType == 3) {
            if (document.getElementById("nicnumber").value === "" ||
                document.getElementById("dateOfBirth").value === "" ||
                document.getElementById("type").value === "") {
                alert("please enter values")
                return;
            }
        } else if (userType == 1) {
            if (document.getElementById("companyName").value === "" ||
                document.getElementById("licenceNumber").value === "" ||
                document.getElementById("description").value === "") {
                alert("please enter values")
                return;
            }

        } else {
            if (document.getElementById("companyName").value === "" ||
                document.getElementById("licenceNumber").value === ""
            ) {
                alert("please enter values")
                return;
            }
        }


        try {

            var formData1 = new FormData();
            formData1.append("image", attachment);
            const resImage = await axios.post(
                "http://localhost:9000/users/saveImge",
                formData1
            );
            let attachmentFileName = "http://localhost:9000/" + resImage.data


            const headers = {
                'Content-Type': 'application/json'
            };

            var values = {
                userId: 0,
                userName: input.userName,
                email: input.email,
                address: input.address,
                contactNumber: input.contactNumber,
                postcode: input.postcode,
                password: encryptPassword(passwordInput),
                userTypeId: userType,
                image: attachmentFileName
            }


            var a = await axios.post("http://localhost:9000/users/postUsers", values, { headers });

            if (a.data == "") {
                alert("User name already there or something went wrong");
                return;
            } else {
                if (userType == 3) {
                    var values1 = {
                        agentId: 0,
                        nicNumber: document.getElementById("nicnumber").value,
                        dob: document.getElementById("dateOfBirth").value,
                        type: document.getElementById("type").value,
                        promoCode: "no",
                        users: a.data,
                        result: "not Accepted",
                        promocount: 0
                    }

                    var b = await axios.post("http://localhost:9000/users/saveAgent", values1, { headers });

                    alert(b.data);
                } else if (userType == 1) {
                    var values1 = {
                        serviceProviderId: 0,
                        companyName: document.getElementById("companyName").value,
                        licenceNumber: document.getElementById("licenceNumber").value,
                        description: document.getElementById("description").value,
                        location: branch,
                        rating: 0,
                        category: document.getElementById("category").value,
                        users: a.data,
                        result: "not Accepted"
                    }



                    var b = await axios.post("http://localhost:9000/users/saveServiceProvider", values1, { headers });

                    alert(b.data);
                } else {
                    var values1 = {
                        serviceConsumerId: 0,
                        companyName: document.getElementById("companyName").value,
                        licenceNumber: document.getElementById("licenceNumber").value,
                        branchId: branch,
                        users: a.data,
                    }

                    console.log(values1)

                    var c = await axios.post("http://localhost:9000/users/saveServiceConsumer", values1, { headers });

                    alert(c.data);
                }
                navigate("/login")

            }
        } catch (ex) {
            console.log(ex)
        }

    }

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    useEffect(() => {
        loadUserTypes();
    }, []);

    useEffect(() => {
        loadBranches();
    }, []);
    return (
        <div
        >
            <Navigation5></Navigation5>

            <Popup
                show={show1}
                handleClose={handleClose1}
                title="Add More Details"
            >
                <Input
                    id="companyName"
                    placeholder="Enter CompanyName......"

                />
                <Input
                    id="licenceNumber"
                    placeholder="Enter LicenceNumber......"

                />
                <Input
                    id="category"
                    placeholder="Enter Category......"

                />
                <label style={{ marginLeft: '30px' }}>Select location</label>

                <select value={branch} onChange={handleChange1} class="form-select" style={{ marginLeft: '30px', width: '405px' }} aria-label="Default select example">
                    {branches.map(item => {
                        return (<option key={item.branchId} value={item.branchId}>{item.branchName}</option>);
                    })}
                </select>
                <TextArea
                    id="description"
                    placeholder="Enter Description......"

                />




                <Button variant="contained" color="primary" style={{ margin: '30px', width: '87%' }} onClick={() => makeRegister()}>Register</Button>


            </Popup>

            <Popup
                show={show3}
                handleClose={handleClose3}
                title="Add More Details"
            >
                <Input
                    id="companyName"
                    placeholder="Enter CompanyName......"

                />
                <Input
                    id="licenceNumber"
                    placeholder="Enter LicenceNumber......"

                />

                <label style={{ marginLeft: '30px' }}>Select Branch</label>

                <select value={branch} onChange={handleChange1} class="form-select" style={{ marginLeft: '30px', width: '405px' }} aria-label="Default select example">
                    {branches.map(item => {
                        return (<option key={item.branchId} value={item.branchId}>{item.branchName}</option>);
                    })}
                </select>


                <Button variant="contained" color="primary" style={{ margin: '30px', width: '87%' }} onClick={() => makeRegister()}>Register</Button>


            </Popup>

            <Popup
                show={show2}
                handleClose={handleClose2}
                title="Add More Details"
            >
                <Input
                    id="nicnumber"
                    placeholder="Enter NicNumber......"

                />
                <label style={{ marginLeft: '30px' }}>Date of Birth</label>

                <input
                    style={{ marginLeft: '30px', width: '87%' }}
                    type="date"
                    id="dateOfBirth"
                    placeholder="Enter DataOfBirth......"

                />
                <Input
                    id="type"
                    placeholder="Enter Type......"

                />

                <Button variant="contained" color="primary" style={{ margin: '30px', width: '87%' }} onClick={() => makeRegister()}>Register</Button>


            </Popup>

            <div style={{ marginTop: "18px", float: 'left', marginLeft: "550px" }}>
                <Card sx={{ width: 500 }}>
                    <CardContent>
                        <form onSubmit={handleSubmit} autoComplete="off">

                            <Input
                                id="userName"
                                value={input.userName}
                                handleInputChange={handleInputChange}
                                placeholder="Enter UserName......"
                                errors={errors.userName}
                            />

                            <Input
                                id="email"
                                value={input.email}
                                handleInputChange={handleInputChange}
                                placeholder="Enter Email......"
                                errors={errors.email}
                            />


                            <Input
                                id="address"
                                value={input.address}
                                handleInputChange={handleInputChange}
                                placeholder="Enter Address......"
                                errors={errors.address}
                            />

                            <Input
                                id="contactNumber"
                                value={input.contactNumber}
                                handleInputChange={handleInputChange}
                                placeholder="Enter contactNumber......"
                                errors={errors.contactNumber}
                            />

                            <Input
                                id="postcode"
                                value={input.postcode}
                                handleInputChange={handleInputChange}
                                placeholder="Enter postcode......"
                                errors={errors.postcode}
                            />
                            {/* <Input
                                id="password"
                                type="password"
                                value={input.password}
                                handleInputChange={handleInputChange}
                                placeholder="Enter password......"
                                errors={errors.password}
                            /> */}
                            <label style={{ marginLeft: '30px' }}>Password</label>

                            <div className="input-group-btn">
                                <input type={passwordType} onChange={handlePasswordChange} value={passwordInput} name="password" class="form-control" placeholder="Password" style={{ marginLeft: '30px', width: '405px' }} />
                            </div>


                            <br></br>             


                            <label style={{ marginLeft: '30px' }}>User Type</label>

                            <select value={userType} onChange={handleChange} class="form-select" style={{ marginLeft: '30px', width: '405px' }} aria-label="Default select example">
                                {UserTypes.map(item => {
                                    return (<option key={item.userTypeId} value={item.userTypeId}>{item.userTypeName}</option>);
                                })}
                            </select>


                            <label style={{ marginLeft: "30px", float: 'left' }}>Select Image</label>
                            <input style={{ marginLeft: "30px", float: 'left' }} type="file" onChange={saveAttachment} />



                            <Button type="submit" variant="contained" color="primary" style={{ margin: '30px', width: '405px' }}>Next</Button>

                        </form>
                    </CardContent>
                </Card>
            </div>




        </div>
    );


}
export default Register;
