import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'
import Navigation2 from "../navigations/Navigation2"
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom'

const AskQuestion = () => {
    const [input, setInput] = useState({
        email: "",
        subject: "",
        description: "",
        inqueringAbout: ""
    })

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    if (localStorage.getItem("userType") !== "serviceConsumer") {
        navigate('/login')
    }

    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('subject' in fieldValues)
            temp.subject = fieldValues.subject ? "" : "This field is required."

        if ('email' in fieldValues)
            if (!fieldValues.email) {
                temp.email = "This field is required."
            } else if (!(/$^|.+@.+..+/).test(fieldValues.email)) {
                temp.email = "This email is not valuable."
            } else {
                temp.email = ""
            }
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."

        // if ('inqueringAbout' in fieldValues)
        //     temp.inqueringAbout = fieldValues.inqueringAbout ? "" : "This field is required."

        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }
    const [inqueringAboutIds, setinqueringAboutIds] = useState([]);
    const [inqueringAboutId, setinqueringAboutId] = useState(0);
    const handleChange1 = e => setinqueringAboutId(e.target.value);
    const loadInqueringAbout = async () => {
        try {

            const response = await axios.get("http://localhost:9000/questions/getInqueringAbout");
            console.log(response.data);
            setinqueringAboutIds(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadInqueringAbout();
    }, []);


    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }



    const [attachment, setAttachment] = useState();
    const saveAttachment = (e) => {
        setAttachment(e.target.files[0]);

    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (validate()) {
            try {

                var formData1 = new FormData();
                formData1.append("attachment", attachment);
                const res = await axios.post(
                    "http://localhost:9000/questions/saveAttachment",
                    formData1
                );
                let attachmentFileName = res.data


                var values = {
                    questionId: 0,
                    email: input.email,
                    subject: input.subject,
                    description: input.description,
                    inqueringAbout: {
                        inqueringAboutId:inqueringAboutId
                    },
                    attachments: attachmentFileName,
                    serviceConsumer:{
                        serviceConsumerId:localStorage.getItem("userId")
                    } 
                }
                const headers = {
                    'Content-Type': 'application/json'
                };
                var res2 = await axios.post("http://localhost:9000/questions/addQuestion", values, { headers });
                alert(res2.data);
                window.location.reload();

            } catch (ex) {
                console.log(ex);
            }
        // }
    }


    return (
        <div>
            <Navigation2></Navigation2>


            <form onSubmit={handleSubmit} autoComplete="off">

                <Input
                    id="email"
                    value={input.email}
                    handleInputChange={handleInputChange}
                    placeholder="Enter Email......"
                    errors={errors.email}
                />
                <Input
                    id="subject"
                    value={input.subject}
                    handleInputChange={handleInputChange}
                    placeholder="Enter subject......"
                    errors={errors.subject}
                />

                <TextArea
                    id="description"
                    value={input.description}
                    handleInputChange={handleInputChange}
                    placeholder="Enter description......"
                    errors={errors.description}
                />

                {/* <Input
                    id="inqueringAbout"
                    value={input.inqueringAbout}
                    handleInputChange={handleInputChange}
                    placeholder="Enter InqueringAbout......"
                    errors={errors.inqueringAbout}
                /> */}

                <select value={inqueringAboutId} onChange={handleChange1} class="form-select" style={{ marginLeft: '30px', width: '96%' }} aria-label="Default select example">
                    {inqueringAboutIds.map(item => {
                        return (<option key={item.inqueringAboutId} value={item.inqueringAboutId}>{item.name}</option>);
                    })}
                </select>

                <br></br>

                <label style={{ marginLeft: "30px", float: 'left' }}>Select Attachment</label>
                <input style={{ marginLeft: "30px" }} type="file" onChange={saveAttachment} />
                <br></br>
                <Button type="submit" variant="contained" color="primary" style={{ margin: '30px' }}>Submit</Button>

            </form>
        </div>
    );
}
export default AskQuestion;