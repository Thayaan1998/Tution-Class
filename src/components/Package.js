import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useNavigate } from 'react-router-dom'


import "../Style.css"
 const Packages = ({packages})=>{
    const navigate = useNavigate();

   

    const nav=(packageId)=>{
        if(package1.status!=="subscribed"){
            navigate('/payment/'+packageId)
        }else{
            alert("you already subscribed")
        }
       

    }

    const[package1,setPackage1]=useState("")

    const loadPackage = async () => {
        try {

            const response = await axios.get("http://localhost:9000/subscribe/getSubscribe/"+localStorage.getItem("userId"));
            setPackage1(response.data)
            // setQuotations(response.data)
            


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadPackage();
    }, []);


     return(
         <> 
         <Card style={{ width: '19rem' , height : "100%"}}>
             <Card.Body>
          <Card.Text className="packageName" style={{color: packages.color}}>{packages.name}</Card.Text>
          <Card.Img src={packages.image} style={{width:"70%",height:"70%",marginLeft:"15%"}} />
          <Card.Text  style={{fontSize:"30px",textAlign:"center",marginBottom:"0px"}}><b>Rs. {packages.price} <span style={{color:packages.color}}>/</span> year</b></Card.Text>
          <Card.Text>
          <ul style={{listStyle:'none'}} >
             <li>{packages.icon1}{packages.templates}+ templates designs</li>
             <li>{packages.icon2}{packages.access}+ accounts per month</li>
             <li>{packages.icon3}Calandar facilities</li>
             <li>{packages.icon4}Google map facilities</li>
         </ul>
         {/* <NavLink to ={{ pathname: `/payment/${packages.id}`}}> */}
             <Button variant="primary" style={{width:"100%"}} onClick={()=>nav(packages.id)}>Subscribe</Button>
             {/* </NavLink> */}
         <Card.Text className="text-end">
            <NavLink
            to={{ 
                pathname: `/packages_details/${packages.id}`
                // query: {
                //   title: post.title, 
                //   content: post.content,
                //   comments: JSON.stringify(post.comments)
                // } 
              }}
            >See more&gt;&gt;&gt;</NavLink></Card.Text>
          </Card.Text>
          </Card.Body>
         </Card>
         </>
     )
 }

 export default Packages;
