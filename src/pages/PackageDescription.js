import { React } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { MdOutlineSupervisorAccount } from "react-icons/md"
import { useParams } from 'react-router-dom'
import { GrTemplate } from "react-icons/gr"
import { SiGooglecalendar ,  SiGooglemaps } from "react-icons/si"
import { GrBusinessService } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import Navigation3 from "../navigations/Navigation3";


const PackDetails = () => {

    const { id } = useParams();

    console.log(id)
    const packagedetails = [
        {
            id: 1,
            name: 'Gold',
            price: 400,
            templates: 5,
            access: 50,
            image: require('../GoldIcon.png'),
            color: '#e6ac00',
            icons1: <SiGooglecalendar size={50}/>,
            icons1h:'Google Calendar',
            icons1d:'Google Calendar is incorporated with the app. So you can save your dates there.',
            icons2: <GrBusinessService size={50}/>,
            icons2h:'Medium scale business',
            icons2d:'This package is more suitable for medium scale businesses.'
        },
        {
            id: 2,
            name: 'Platinum',
            price: 500,
            templates: 10,
            access: 100,
            image: require('../PlatinumIcon.png'),
            color: '#6a6b6b',
            icons1: <SiGooglecalendar size={50}/>,
            icons1h:'Google Calendar',
            icons1d:'Google Claendar is incorporated with the app. So you can save your dates there.',
            icons2: <SiGooglemaps size={50}/>,
            icons2h:'Google Map',
            icons2d:'Google Map is enabled here so you can share your location through that.'
        },
        {
            id: 3,
            name: 'Silver',
            price: 300,
            templates: 3,
            access: 25,
            image: require('../SilverIcon.png'),
            color: '#b7babc',
            icons1: <GrBusinessService size={50}/>,
            icons1h:'Small scale business',
            icons1d:'This package is more suitable for medium scale businesses.',
            icons2: <GiReceiveMoney size={50}/>,
            icons2h:'Save money',
            icons2d:'This package is very low price. You can enjoy limited benfits with lower price'

        }
    ]
    return (
        <>
           <Navigation3></Navigation3>
            <p className="packageName" style={{ color: packagedetails[id-1].color, textAlign: 'left', padding: '1% 18% 2%' }}>{packagedetails[id-1].name} <b><span style={{ fontSize: "30px", fontFamily: "Trebuchet MS", marginBottom: "2%", marginTop: "0%", textAlign: "center", color: 'black' }}>: About  <span style={{ color: "#0080ff" }} >Package</span></span></b>   </p>
            <CardGroup style={{ margin: '0% 15%' }}>
                <Card><Card.Body> 
                    <Card.Img src={packagedetails[id-1].image} style={{width:"100%",height:"100%"}} />
                </Card.Body></Card>
               
                <Card><Card.Body>
                    <Card.Text> <p style={{ textAlign: 'justify', paddingRight: '10%', paddingTop: '10%' }}>This is {packagedetails[id-1].name} package . This package is nice. It has good features. It has great features such access
                    {packagedetails[id-1].access} account per month, {packagedetails[id-1].templates}+ templates ,google.It is suitable for medium scale businesses. Subscribe and enjoy!
                    </p>
                        <p className="fs-5 text-secondary">Starts from <span style={{ fontSize: '40px', color: packagedetails[id-1].color }}>Rs.{packagedetails[id-1].price}</span> per year</p>
                        <Button>Subscribe</Button>
                        <h6 className="fs-5 text-primary" variant="primary" >Try package for free. Get one week free trial !</h6></Card.Text>
                </Card.Body></Card>


            </CardGroup>

            <CardGroup style={{ margin: '5% 10%', textAlign: 'center' }}>
                <Card><Card.Body className="mx-auto"><MdOutlineSupervisorAccount size={50} /><h5><b>{packagedetails[id-1].access}+ Accounts</b></h5><p>You can access {packagedetails[id-1].access}+ service consumers posts fit to your criterias per month.</p></Card.Body></Card>
                <Card><Card.Body className="mx-auto"><GrTemplate size={50} /><h5><b>{packagedetails[id-1].templates} Templates designs</b></h5><p>You can customize your profile with {packagedetails[id-1].templates}+ different templates.</p></Card.Body></Card>
                <Card><Card.Body className="mx-auto">{packagedetails[id-1].icons1} <h5><b>{packagedetails[id-1].icons1h}</b></h5><p>{packagedetails[id-1].icons1d}</p></Card.Body></Card>
                <Card><Card.Body className="mx-auto">{packagedetails[id-1].icons2}<h5><b>{packagedetails[id-1].icons2h}</b></h5><p>{packagedetails[id-1].icons2d}</p></Card.Body></Card>
            </CardGroup>
        </>
    )

}

export default PackDetails;