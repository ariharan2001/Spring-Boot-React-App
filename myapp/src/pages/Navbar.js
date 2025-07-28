
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/navbar.css"
import Ratings from './Ratings';

function Navbar() {

    const [appointment, setAppontment] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [record, setRecord] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    const navigate = useNavigate()

    function handleLogOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate("/login");
    }

    useEffect(()=>{

        if(appointment){
            axios.get(`${process.env.REACT_APP_API_URL}/getrecords`, {params:{ email:email}, headers:{'Authorization': token } }).then((response)=>{
                console.log(response.data)
                setRecord(response.data)
            })
        }

    },[appointment])

    return (
        <>
        <nav className='navbar'>
            <h2 className='title'>Xyz Hospitol Services</h2>
            <ul className='navLinks'>
                <li className='navItem'><a href="/" style={{ color: 'white', textDecoration: "none" }}>Home</a></li>
                { userType === "user" && <li className='navItem'><a href="#" onClick={()=>setAppontment(!appointment)} style={{ color: 'white', textDecoration: "none" }}>Appointments</a></li>}
                <li className='navItem'><a href="#" onClick={()=>setReviews(!reviews)} style={{ color: 'white', textDecoration: "none" }}>Reviews</a></li>
                <li className='navItem'><a href="#" onClick={handleLogOut} style={{ color: 'white', textDecoration: "none", marginRight:"1rem" }}>Logout</a></li>
            </ul>
        </nav>
        {
        appointment && userType === "user" &&
                <div className='box'>
                    {
                        record.map((item) => {
                            return(
                                <div style={{display:"flex", justifyContent:"space-between",padding: "10px", background:"white",borderRadius:"5px", margin: "1rem"}}>
                                    <div style={{display:"flex", flexDirection: "column"}}>
                                        <span>Id: {item.id}</span>
                                        <span style={{}}>({item.admissiondate} / {item.slot})</span>
                                    </div>
                                    <div style={item.status === "pending" ? styles.pending : (item.status === "approved" ? styles.approved : styles.cancelled)}>
                                        {item.status}
                                    </div>
                                </div>   
                            )
                        })
                    }
                    {
                        record.length === 0 && 
                            <div style={{ padding:"1rem", textAlign:"center"}}>
                               (-|-) You made no appointments yet!!!
                            </div>
                    }
                </div>
        }
        {
        reviews &&
            <Ratings />
        }
        </>
    );
}

const styles = {
    empty: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "1rem",
        alignItems: "center",
        background: "white",
        width: "10rem",
        height: "10rem",
    },
    pending: {
        border:"0.5px solid orange", background:"#FFFACD", color:"#FFA500", borderRadius: "13px", padding: "5px"
    },
    approved: {
        border:"0.5px solid green", background:"#90EE90", color:"#28a745", borderRadius: "13px", padding: "5px"
    },
    cancelled: {
        border:"0.5px solid red", background:"#FFB6C1", color:"#DC3545", borderRadius: "13px", padding: "5px"
    }
};

export default Navbar;
