import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import TextArea from '../controls/TextArea'

const PostRequirement = () => {

    const [input, setInput] = useState({
        location: "",
        requirementDetails: "",
        email: "",
        phonenumber: "",
        category: ""
    })

    const [errors, setErrors] = useState({});

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
        if ('location' in fieldValues)
            temp.location = fieldValues.location ? "" : "This field is required."

        if ('phonenumber' in fieldValues)
            temp.phonenumber = fieldValues.phonenumber.length > 9 ? "" : "The length should be 10"

        if ('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "This field is required."

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


    
    const handleSubmit = async(e) => {
        e.preventDefault()

        if (validate()) {

            var values = {
                requirementId: 0,
                location:input.location,
                requirementDetails: input.requirementDetails,
                email:input.email,
                phonenumber: input.phonenumber,
                category:input.category,
                serviceConsumerId :1
            }

            console.log(values)

            try{
                const headers = {
                    'Content-Type': 'application/json'
                };
    
                var a= await axios.post("http://localhost:9000/postrequirement/addPostRequirement", values, { headers });
    
                console.log(a);

                alert(a.data);
            }catch(ex){
                 console.log(ex)
            }
         }

    }


    return (
        <div
        >

            <form onSubmit={handleSubmit} autoComplete="off">
    

            <Input
                    id="category"
                    value={input.category}
                    handleInputChange={handleInputChange}
                    placeholder="Enter category......"
                    errors={errors.category}
                />
               <Input
                    id="location"
                    value={input.location}
                    handleInputChange={handleInputChange}
                    placeholder="Enter location......"
                    errors={errors.location}
                />
              

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
            
                <button type="submit" class="btn btn-primary" style={{ margin: '30px' }}>Submit</button>

            </form>


        </div>
    );


}
export default PostRequirement;
