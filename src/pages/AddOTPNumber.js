import React, { useState, useEffect } from "react";
import Input from '../controls/Input'

const AddOTPNumber = (props) => {

    const { otpNumber } = props;

    console.log(otpNumber)


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
                <button type="submit" class="btn btn-primary" style={{ margin: '30px' }}>Submit OTP</button>

            </form>
        </div>

    );
}

export default AddOTPNumber;