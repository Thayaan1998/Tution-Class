import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'

const SendPromo = () => {
    const [serviceProviders, setServiceProviders] = React.useState([]);

    const [serviceProvider, setServiceProvider] = useState('');


    const handleChange = (e) => {

        setServiceProvider(e.target.value);
        console.log(e.target.value)
    }





    const loadServiceProviders = async () => {
        try {
            const response = await axios.get("http://localhost:9000/servicePromo/getServiceProviders");
            console.log(response.data);
            setServiceProviders(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(document.getElementById("id1").value)


            let values = {
                serviceproviderWithPromoId: 0,
                serviceproviderId: document.getElementById("id1").value,
                agentId: 1
            }
            const headers = {
                'Content-Type': 'application/json'
            };
            var res2 = await axios.post("http://localhost:9000/servicePromo/postPromos", values, { headers });
            alert(res2.data);
        } catch (ex) {
            console.log(ex);
        }


    }

    useEffect(() => {
        loadServiceProviders();
    }, []);
    return (
        <div
        >

            <form onSubmit={handleSubmit} autoComplete="off">



                <select value={serviceProvider} id="id1" onChange={handleChange} class="form-select" aria-label="Default select example" style={{ margin: '30px' }}>
                    {serviceProviders.map(item => {
                        return (<option key={item.serviceProviderId} value={item.serviceProviderId}>{item.servideProviderName}</option>);
                    })}
                </select>



                <button type="submit" class="btn btn-primary" style={{ margin: '30px' }}>Submit</button>

            </form>


        </div>
    );


}
export default SendPromo;
