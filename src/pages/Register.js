import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'

const Register = () => {
    const [userType, setUserType] = React.useState('');

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

        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."

        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }

    const handleChange = e => setUserType(e.target.value);

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }


    const [UserTypes, setUserTypes] = useState([]);
    const loadUserTypes = async () => {
        try {
            const response = await axios.get("http://localhost:9000/users/getUserTypes");
            console.log(response.data);
            setUserTypes(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (validate()) {

            var values = {
                userId: 0,
                userName: input.userName,
                email: input.email,
                address: input.address,
                contactNumber:input.contactNumber,
                postcode: input.postcode,
                password:input.password,
                userTypeId:userType
            }

            try{
                const headers = {
                    'Content-Type': 'application/json'
                };
    
                var a= await axios.post("http://localhost:9000/users/postUsers", values, { headers });
    
                console.log(a);

                alert(a.data);
            }catch(ex){
                 console.log(ex)
            }
               }

    }

    useEffect(() => {
        loadUserTypes();
    }, []);
    return (
        <div
        >

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
                  <Input
                    id="password"
                    value={input.password}
                    handleInputChange={handleInputChange}
                    placeholder="Enter password......"
                    errors={errors.password}
                />

                <select value={userType}  onChange={handleChange} class="form-select" aria-label="Default select example" style={{ margin: '30px' }}>
                    {UserTypes.map(item => {
                        return (<option key={item.userTypeId} value={item.userTypeId}>{item.userTypeName}</option>);
                    })}
                </select>



                <button type="submit" class="btn btn-primary" style={{ margin: '30px' }}>Submit</button>

            </form>


        </div>
    );


}
export default Register;
