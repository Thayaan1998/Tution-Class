import React, { useState, useEffect } from "react";
import Input from '../controls/Input'
import Button from '@mui/material/Button';

const EditProfile = (props) => {

    const { handleClose1, profileData } = props;


    const [input, setInput] = useState({
        name: "",
        age: ""
        
    })
    useEffect(() => {
        if (profileData != null) {
            console.log(profileData)
            setInput(profileData)
        }
    }, []);

    const [errors, setErrors] = useState({});

  const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."

       
        if ('age' in fieldValues)
            temp.age = fieldValues.age ? "" : "This field is required."

      

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

    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validate()) {
            
                var values = {
                   
                    name: input.name,
                    age: input.age,
                   
                }
                handleClose1(values);
            


        }

    }

    return (
        <div

        >

            <form onSubmit={handleSubmit} autoComplete="off">

                <Input
                    id="name"
                    value={input.name}
                    handleInputChange={handleInputChange}
                    placeholder="Enter Name......"
                    errors={errors.name}
                />

                <Input
                    id="age"
                    value={input.age}
                    handleInputChange={handleInputChange}
                    placeholder="Enter Age......"
                    errors={errors.age}
                />


            

                <Button type="submit" variant="contained" color="primary" style={{ margin: '30px' }}>Edit</Button>

            </form>
        </div>

    );
}

export default EditProfile;
