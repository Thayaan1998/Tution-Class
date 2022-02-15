import React, { useState } from "react";

const AddCustomer = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        address: "",
        phonenumber: ""
    })
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."

        if ('email' in fieldValues)
            if(!fieldValues.email){
                temp.email =  "This field is required."
            }else if(!(/$^|.+@.+..+/).test(fieldValues.email)){
                temp.email =  "This email is not valuable."
            }else{
                temp.email=""   
            }
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        
        if ('phonenumber' in fieldValues)
            temp.phonenumber = fieldValues.phonenumber.length>9 ? "" : "The length should be 10"
        
    
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

        if(validate()){

        }

    }




    return (
        <div

            style={{ marginLeft: '20px', width: '70%' }}

        >
            <h1>Thaya\an1234</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div class="form-group" style={{ margin: '30px' }}>
                    <label for="inputName">Enter Name</label>
                    <input name="name"
                        id="name"
                        value={input.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name......"
                        class="form-control"
                    />

                    {errors.name && <div class="alert alert-danger">{errors.name}</div>}
                </div>
                <div class="form-group" style={{ margin: '30px' }}>
                    <label for="inputEmail">Enter Email</label>
                    <input name="email"
                        id="email"
                        value={input.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email......"
                        class="form-control"
                    />

                    {errors.email && <div class="alert alert-danger">{errors.email}</div>}
                </div>
                <div class="form-group" style={{ margin: '30px' }}>
                    <label for="inputAddress">Enter Address</label>
                    <input name="address"
                        id="address"
                        value={input.address}
                        onChange={handleInputChange}
                        placeholder="Enter Address......"
                        class="form-control"
                    />

                    {errors.address && <div class="alert alert-danger">{errors.address}</div>}
                </div>
                <div class="form-group" style={{ margin: '30px' }}>
                    <label for="inputAddress">Enter Phonenumber</label>
                    <input 
                      type="number"
                      name="phonenumber"
                        id="phonenumber"
                        value={input.phonenumber}
                        onChange={handleInputChange}
                        placeholder="Enter Phonenumber......"
                        class="form-control"
                    />

                    {errors.phonenumber && <div class="alert alert-danger">{errors.phonenumber}</div>}
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>

    );
}

export default AddCustomer;
