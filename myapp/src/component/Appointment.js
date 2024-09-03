import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/appointment.css"
import Success from "../pages/Success";
import Button from "./Button";

const Appointment = ({ setForm }) => {

    const email = localStorage.getItem('email')

    const [value,setValue] = useState({email: email, slot:"morning", status: "pending"});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState();

    const token = localStorage.getItem('token');

    function handleChange(e) {
        setValue({...value, [e.target.name]:e.target.value });
    }

    function validate(){
        let error_msg = ""

        if (!value.name) error_msg = "Name is required.";
        else if (value.age < 1 || value.age > 100 ) error_msg = "Age is invalid.";
        else if (!value.mobile) error_msg = "Mobile number is required.";
        else if (value.mobile.length < 10 || value.mobile.length > 12) error_msg = "Invalid mobile number";
        
        setError(error_msg);
        return error_msg == "";
    }


    function handleSubmit(e) {

        e.preventDefault();

        if(validate())
            axios.post("http://localhost:8080/insertrecord",value, {headers:{ 'Authorization': token } }).then((data)=>{

                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setForm(false);
                }, 1000);
                
            })
            .catch(error => {
                console.log('There was an error making the request:', error);
            });
    }


    return(<>
        <div style={{position: 'fixed', width: "100%", display:"flex", justifyContent:"center", top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}} >

            <form className="flex-con" onSubmit={handleSubmit}>

                <button style={{position: "absolute",fontSize:"1.2rem", top: "0px", right: "0px", border: "none", color: "red", cursor:"pointer",  background: "transparent"}} onClick={()=>setForm(false)}>&times;</button>
              
                <p style={{fontSize:"0.8rem", padding:"0rem 0.5rem 0rem 1rem"}}><span style={{fontWeight:"500", padding:"0rem 1rem 0rem 1rem"}}>Note:</span> Hey there, here you can fill your details to book appointment for your check up. Make sure to select working days and slots timings are morning (10am - 1pm) to evening (2pm - 8pm).</p>

                    <div className="flex-item">
                        <input type="text" id="patient-name" name="name" onChange={(e) => handleChange(e)} placeholder="Enter Name" required />
                        <input type="number" id="age" name="age" onChange={(e) => handleChange(e)} placeholder="Enter age" required />
                    </div>
                
                    <div className="flex-item">
                        <input type="text" id="city" name="city" onChange={(e) => handleChange(e)} placeholder="Enter City" required />
                        <input type="number" id="mobile" name="mobile" onChange={(e) => handleChange(e)} placeholder="Enter Mobile" required />
                    </div>

                    <div className="flex-item">
                        <input type="date" id="admission-date" name="admissiondate" onChange={(e) => handleChange(e)} placeholder="Select appointment date" required />
                        <select name="slot" id="slot" onChange={(e) => handleChange(e)} placeholder="Select Slot" required >
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                        </select>
                    </div>
                    <div className="flex-item" style={{ display:"flex", justifyContent:"center"}}>
                        {/* <Button label="close" onClick={()=>{setForm(false)}} onHover={handleOnHover} onLeave={handleOnLeave} style={styles.closeButton} /> */}
                        <Button label="submit" type="submit" style={{width:'100%', padding: '5px 10px', width:"50%" }} />
                    </div>
                    {error != "" && <span className="error" style={{paddingBottom:"10px"}}>{error}</span>}
              
            </form>

        </div>

        {success && <Success message="Appointment Successfull!"/>}

        </>
    )
}


export default Appointment;