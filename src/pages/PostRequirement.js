import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'
import Navigation2 from "../navigations/Navigation2"
import { Card } from 'react-bootstrap';


import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'


const PostRequirement = () => {

    const [input, setInput] = useState({
        location: 1,
        requirementDetails: "",
        email: "",
        phonenumber: "",
        category: ""
    })
    const navigate = useNavigate();



    const [errors, setErrors] = useState({});

    const [locations, setLocations] = React.useState([]);

    if (localStorage.getItem("userType") !== "serviceConsumer") {
        navigate('/login')
    }



    const loadLocations = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getBranches");
            setLocations(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    const handleChange1 = e => setInput({location:e.target.value});


    useEffect(() => {
        loadLocations();
    }, []);

    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('requirementDetails' in fieldValues)
            temp.requirementDetails = fieldValues.requirementDetails ? "" : "This field is required."

        if ('email' in fieldValues)
            if (!fieldValues.email) {
                temp.email = "This field is required."
            } else if (!(/$^|.+@.+..+/).test(fieldValues.email)) {
                temp.email = "This email is not valuable."
            } else {
                temp.email = ""
            }
       

        if ('phonenumber' in fieldValues)
            temp.phonenumber = fieldValues.phonenumber.length > 9 ? "" : "The length should be 10"

       

        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }


    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {

            var values = {
                requirementId: 0,
                branch:   {
                    branchId:input.location
                },
                requirementDetails: input.requirementDetails,
                email: input.email,
                phonenumber: input.phonenumber,
                category: input.category,
                serviceConsumer: {
                    serviceConsumerId:localStorage.getItem("userId")

                }
            }

            console.log(values)





            try {
                const headers = {
                    'Content-Type': 'application/json'
                };

                var a1 = await axios.post("http://localhost:9000/postrequirement/addPostRequirement", values, { headers });

                console.log(a1);

                try {
                    var values1 = {
                        'to': 'cpObYHnYGNebcR3htbqkI7:APA91bF6LaMPVhiIlkDqS4DZ5J9PbK3Iav2FyArt9KtszuCnc6ywjzjWfYzQ2xUPiAlossBlt84UFDMgsHvoPI6yHjYyssv9zXSyvJcWo6lxpO6erjtUt9M2mxOIJbdmI1QpbstMBcqJ',
                        'notification': {

                            'body': 'ahahahha  sssssssssssssssssssss',
                            'title': 'aaaaaaaaaaaaaaaaaaaaa'
                        }
                    }
                    axios
                        .post(
                            "https://fcm.googleapis.com/fcm/send",

                            values1
                            ,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization:
                                        "key=AAAAhnaShsw:APA91bHVgM38GFYy6zVrICghMhrpZLpln3TCp7gU0ctAqKU6cIWM5oFKJGz1JyqtKHmM2pxfVptVZ0abU0qckm5hKPqjn6EaSacpBu8YYoliRJM1Jb_E0M-9hZH603q2UamC_hdSHCdf"
                                }
                            }
                        )
                        .then(response => {
                            console.log("response" + response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } catch (ex) {
                    console.log(ex)
                }

                alert(a1.data);
            } catch (ex) {
                console.log(ex)
            }

        }

    }


    return (
        <div
        >
            <Navigation2></Navigation2>

            <form onSubmit={handleSubmit} autoComplete="off">


                <Input
                    id="category"
                    value={input.category}
                    handleInputChange={handleInputChange}
                    placeholder="Enter category......"
                    errors={errors.category}
                />
               
               <label style={{ marginLeft: '30px' }}>Select location</label>
                <select value={input.location} onChange={handleChange1} class="form-select" style={{ marginLeft: '30px', width: '96%' }} aria-label="Default select example">
                    {locations.map(item => {
                        return (<option key={item.branchId} value={item.branchId}>{item.branchName}</option>);
                    })}
                </select>


                <Input
                    id="email"
                    value={input.email}
                    handleInputChange={handleInputChange}
                    placeholder="Enter Email......"
                    errors={errors.email}
                />
                <Input
                    id="phonenumber"
                    value={input.phonenumber}
                    handleInputChange={handleInputChange}
                    placeholder="Enter phonenumber......"
                    errors={errors.phonenumber}
                />

                <TextArea
                    id="requirementDetails"
                    value={input.requirementDetails}
                    handleInputChange={handleInputChange}
                    placeholder="Enter requirementDetails......"
                    errors={errors.requirementDetails}
                />

                <Button type="submit" variant="contained" color="primary"style={{ margin: '30px' }} >Post Requirment</Button>


            </form>


        </div>
    );


}
export default PostRequirement;
