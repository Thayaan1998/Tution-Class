import { React } from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Packages from "../components/Package"; 
import Navigation3 from "../navigations/Navigation3";

const PackagePage = () => {
  
        const packagedetails = [
            {   id : 1,
                name: 'Gold' ,
                price: 400 ,
                templates: 5 ,
                access : 50 ,
                icon1 : <TiTick size={20} color={'green'}/> ,
                icon2 : <TiTick size={20} color={'green'}/> ,
                icon3 : <TiTick size={20} color={'green'}/> ,
                icon4 : <ImCross color="red"/> ,
                image : require('../GoldIcon.png'),
                color : '#e6ac00'

            },
            {  
                id :2,
                name: 'Platinum' ,
                price: 500,
                templates: 10 ,
                access : 100 ,
                icon1 : <TiTick size={20} color={'green'}/> ,
                icon2 : <TiTick size={20} color={'green'}/> ,
                icon3 : <TiTick size={20} color={'green'}/> ,
                icon4 : <TiTick size={20} color={'green'}/>,
                image : require('../PlatinumIcon.png'),
                color : '#6a6b6b'

            },
            {  id:3,
                name : 'Silver' ,
                price: 300 ,
                templates: 3 ,
                access : 25 ,
                icon1 : <TiTick size={20} color={'green'}/> ,
                icon2 : <TiTick size={20} color={'green'}/> ,
                icon3 : <TiTick size={20} color={'green'}/> ,
                icon4 : <ImCross color="red"/> ,
                image : require('../SilverIcon.png') ,
                color : '#b7babc'

            }
        ]
        const packageList = packagedetails.map(packages =>  <Packages key={packages.id} packages={packages}/>)
        
           return (
            <>
            <Navigation3></Navigation3>
            <h1 style={{fontSize:"30px",fontFamily:"Trebuchet MS",textAlign:"center"}}><b>Choose your</b> <span style={{color:"#0080ff"}} ><b>Package</b> </span></h1> 
            <div className="row" style={{alignItems:"center",justifyContent:"center"}} >{packageList}</div>
            </>
           )        
        
    }
    export default PackagePage;
