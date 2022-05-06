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
             debugger
            try{
                
                const headers1 = {
                    'Content-Type': 'application/json',
                    'Authorization':'key=AAAAhnaShsw:APA91bHVgM38GFYy6zVrICghMhrpZLpln3TCp7gU0ctAqKU6cIWM5oFKJGz1JyqtKHmM2pxfVptVZ0abU0qckm5hKPqjn6EaSacpBu8YYoliRJM1Jb_E0M-9hZH603q2UamC_hdSHCdf'
                };

                var values1={
                    'to': 'cpObYHnYGNebcR3htbqkI7:APA91bF6LaMPVhiIlkDqS4DZ5J9PbK3Iav2FyArt9KtszuCnc6ywjzjWfYzQ2xUPiAlossBlt84UFDMgsHvoPI6yHjYyssv9zXSyvJcWo6lxpO6erjtUt9M2mxOIJbdmI1QpbstMBcqJ',
                    'notification': {
                 
                     'body': 'ahahahha  sssssssssssssssssssss',
                     'title': 'aaaaaaaaaaaaaaaaaaaaa'
                    }
                }


    
                 await axios.post("https://fcm.googleapis.com/fcm/send", values1, { headers1 });
    
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
