import React, { useState, useEffect } from "react";
import Input from '../controls/Input'

const AddCustomer = (props) => {

    const { handleClose1, handleClose2, idIncrement, customerData } = props;


    const [input, setInput] = useState({
        id: 0,
        name: "",
        email: "",
        address: "",
        phonenumber: ""
    })

  
    // let cars = [];
    // useEffect(() => {
    //  cars.push() [
    //         {
    //             "color": "purple",
    //             "type": "minivan",
    //             "registration": new Date('2017-01-03'),
    //             "capacity": 7
    //         },
    //         {
    //             "color": "red",
    //             "type": "station wagon",
    //             "registration": new Date('2018-03-03'),
    //             "capacity": 5
    //         },
    //     ];
    // }, []);

    useEffect(() => {
        if (customerData != null) {
            console.log(customerData)
            setInput(customerData)
        }
    }, []);

    const [errors, setErrors] = useState({});

  const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."

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

    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {

            if (customerData == null) {
                var values = {
                    id: idIncrement,
                    name: input.name,
                    email: input.email,
                    address: input.address,
                    phonenumber: input.phonenumber
                }
                handleClose1(values);
            } else {
                var values = {
                    id: customerData.id,
                    name: input.name,
                    email: input.email,
                    address: input.address,
                    phonenumber: input.phonenumber
                }
                handleClose2(values);
            }


            input.name = "";
            input.email = "";
            input.address = "";
            input.phonenumber = "";


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
                    id="phonenumber"
                    value={input.phonenumber}
                    handleInputChange={handleInputChange}
                    placeholder="Enter Phonenumber......"
                    errors={errors.phonenumber}
                />

              

                <button type="submit" class="btn btn-primary" style={{ margin: '30px' }}>Submit</button>

            </form>
        </div>

    );
}

export default AddCustomer;
