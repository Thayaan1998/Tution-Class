import React, { useState, useEffect } from "react";
import Popup from '../controls/Popup'
import axios from "axios";

import AddCustomer from "./AddCustomer";


const CustomerList = () => {
    const [theArray, setTheArray] = useState([]);
    const [show, setShow] = useState(false);
    const [idIncrement, setIdIncrement] = useState(1);

    const [editCustomerData, setEditCustomerData] = useState(1);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteData = (id) => {
        let array1 = theArray;
        let index = array1.findIndex(item => item.id == id);
        if (index > -1) {
            array1.splice(index, 1)
            setTheArray([...array1]);
        }

    }


    const handleEditData = (item) => {
        setEditCustomerData(item);
        handleShow(true);
        

    }

    const handleCreateData = () => {
        setEditCustomerData(null);
        handleShow(true)

    }

    const handleClose1 = (customer) => {
       console.log(customer);
       setShow(false);

       setTheArray([...theArray, customer]);
       setIdIncrement(idIncrement + 1);

    }

    
    
    const handleClose2 = (customer) => {
        console.log(customer);
        // setShow(false);
 
        // setTheArray([...theArray, customer]);
        // setIdIncrement(idIncrement + 1);

        let array1 = theArray;
        let index = array1.findIndex(item => item.id == customer.id);
        if (index > -1) {
           array1[index].name=customer.name;
           array1[index].email=customer.email;
           array1[index].address=customer.address;
           array1[index].phonenumber=customer.phonenumber;
           setTheArray([...array1]);
           setShow(false);
        }

 
     }
    return (
        <div   style={{ marginLeft: '30px',marginTop:'40px',width: '70%' }}>
            <button class="btn btn-primary" onClick={() => handleCreateData()}>Add Customer</button>

            <Popup
                show={show}
                handleClose={handleClose}
                title="New PopUp Box"
            >
            <AddCustomer
                 handleClose1={handleClose1}
                 handleClose2={handleClose2}
                 customerData={editCustomerData}
                 idIncrement={idIncrement}
            />
            </Popup>

            <table table class="table">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <th>email</th>
                        <th>address</th>
                        <th>phonenumber</th>
                        <th>Delete/Edit</th>

                    </tr>
                </thead>
                <tbody>

                    {theArray.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.phonenumber}</td>
                                <td>  <button class="btn btn-danger" onClick={() => handleDeleteData(item.id)}>Delete</button>  
                                <button class="btn btn-primary" onClick={() => handleEditData(item)}>Edit</button>  
                                  </td>
                                {/* */}
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default CustomerList;