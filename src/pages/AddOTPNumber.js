import React, { useState, useEffect } from "react";
import Input from '../controls/Input'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


const AddOTPNumber = (props) => {
    const navigate = useNavigate();


    const { otpNumber,userType,userId,userName } = props;

    console.log(otpNumber)
    console.log(userName)

    // console.log(userType)
    // console.log(userId)




    const [input, setInput] = useState({
        otp: ""
    })

  

    const [errors, setErrors] = useState({});

  const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('otp' in fieldValues)
            temp.otp = fieldValues.otp ? "" : "This field is required."


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
            if(input.otp==otpNumber){
                console.log("login successful")
                localStorage.setItem("userType",userType);
                localStorage.setItem("userId",userId);
                localStorage.setItem("userName",userName);


                if(userType==="serviceProvider"){
                    navigate("/getPostRequirements")
                }else if(userType==="serviceConsumer"){
                    navigate("/postRequirement")
                }else{
                    navigate("/sendPromo")
                }
            }
        }

    }

    return (
        <div

        >

            <form onSubmit={handleSubmit} autoComplete="off">

                <Input
                    id="otp"
                    value={input.otp}
                    handleInputChange={handleInputChange}
                    placeholder="Enter Otp......"
                    errors={errors.otp}
                />
                <Button type="submit" variant="contained" color="primary" style={{ margin: '30px' }}>Submit OTP</Button>

            </form>
        </div>

    );
}

export default AddOTPNumber;