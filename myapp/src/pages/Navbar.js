
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const [appointment, setAppontment] = useState(false);
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
            axios.get("http://localhost:8080/getrecords", {params:{ email:email}, headers:{'Authorization': token } }).then((response)=>{
                console.log(response.data)
                setRecord(response.data)
            })
        }

    },[appointment])

    return (
        <>
        <nav style={styles.navbar}>
            <h2 style={styles.title}>Xyz Hospitol Services</h2>
            <ul style={styles.navLinks}>
                <li style={styles.navItem}><a href="home" style={{ color: 'white', textDecoration: "none" }}>Home</a></li>
                { userType === "user" && <li style={styles.navItem}><a href="javascript:void(0);" onClick={()=>setAppontment(!appointment)} style={{ color: 'white', textDecoration: "none" }}>Appointments</a></li>}
                <li style={styles.navItem}><a href="ratings" style={{ color: 'white', textDecoration: "none" }}>Reviews</a></li>
                <li style={styles.navItem}><a href="javascript:void(0);" onClick={handleLogOut} style={{ color: 'white', textDecoration: "none", marginRight:"1rem" }}>Logout</a></li>
            </ul>
        </nav>
        {
        appointment && userType === "user" &&
                <div style={styles.box}>
                    {
                        record.map((item) => {
                            return(
                                <div style={{display:"flex", justifyContent:"space-between",padding: "10px", background:"white",borderRadius:"5px", margin: "1rem", fontSize:"0.9rem"}}>
                                    <div style={{display:"flex", flexDirection: "column"}}>
                                        <span>Id: {item.id}</span>
                                        <span style={{fontSize:"0.8rem"}}>({item.admissiondate} / {item.slot})</span>
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
        </>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        backgroundColor: '#333',
        color: 'white',
    },
    title: {
        margin: '0',
    },
    navLinks: {
        listStyleType: 'none',
        display: 'flex',
        gap: '1rem',
    },
    navItem: {
        margin: '0',
    },
    box: {
        position: "absolute",
        top: "4rem",
        zIndex: "1000",
        right: 0,
        width:"20rem",
        // height:"15rem",
        backgroundColor: "#f4f4f4",
        borderRadius: "2px",
    },
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
