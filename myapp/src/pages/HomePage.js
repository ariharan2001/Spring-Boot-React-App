import React, { useEffect, useState } from "react";
import axios from "axios";
import Success from "./Success";
import "../css/bgpic.css"
import Button from "../component/Button";
import Appointment from "../component/Appointment";
import Records from "../component/Records";


const HomePage = () => {

    const userType = localStorage.getItem("userType")

    const [form, setForm] = useState(false);
    const [user, setUser] = useState(userType);

    const handleClick = () => {
        setForm(true);
    }

    return(
    <>{
        userType ===  "user" ?
        <div className="bg-pic">
            
            <p style={styles.headSlog}>
                Medical Services <br/>
                that you can trust
            </p>
            <p style={styles.subSlog}>
                At our clinic, we’re dedicated to providing exceptional care tailored to your needs. Whether it’s a routine check-up or specialized treatment, our experienced team is here to ensure you get the best care possible.
            </p>

            <Button label="Book Appointment" onClick={handleClick} style={{marginLeft: '5rem', marginTop: '2rem'}} />

            { form && <Appointment setForm={setForm}/>}

        </div> :
        <div className="bg-pic">
            <Records />
        </div>
    }</>
    )

}

const styles = {
    headSlog : {
        fontSize: '30px',
        color: 'white',
        margin: '0px',
        marginTop: '8rem',
        marginLeft: '5rem'
    },
    subSlog : {
        marginLeft: '5rem',
        marginTop: '2rem',
        width: '30%',
        color: 'white',

    }
}

export default HomePage;

// const App = () => {

//     const [value,setValue] = useState({slot:"morning"});
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [sucess, setSuccess] = useState(false);
//     const [error, setError] = useState();


//     function handleChange(e) {
//         setValue({...value, [e.target.name]:e.target.value });
//         console.log(value);
//     }

//     function validate(){

//         let error_msg = ""

//         if (!value.name) error_msg = "Name is required.";
//         else if (value.age < 1 || value.age > 100 ) error_msg = "Age is invalid.";
//         else if (!value.mobile) error_msg = "Mobile number is required.";
//         else if (value.mobile.length < 10 || value.mobile.length > 12) error_msg = "Invalid mobile number";
        
//         setError(error_msg);

//         return error_msg == "";
     
//     }


//     function handleSubmit(e) {

//         e.preventDefault();

//         if(validate())
//             axios.post("http://localhost:8080/insertrecord", value).then((data)=>{
//                 console.log(data);

//                 setSuccess(true);
                
//             })
//     }

//     useEffect(() => {

//         if(isSubmitted){

//             console.log("form submitted...", value)

//             setIsSubmitted(false);
//         }

//     },[isSubmitted])

//     return(
//         <div className="user-page">
//             <h2 className="headline">Register your details for admission</h2>
//             <form className="form" onSubmit={handleSubmit}>

//                 <div className="flex-con">
//                     <div className="flex-item">
//                         <label htmlFor="patient-name">Patient Name</label>
//                         <input type="text" id="patient-name" name="name" onChange={(e) => handleChange(e)} required />
//                     </div>
//                     <div className="flex-item">
//                         <label htmlFor="age">Age</label>
//                         <input type="number" id="age" name="age" onChange={(e) => handleChange(e)} required />
//                     </div>
//                     <div className="flex-item">
//                         <label htmlFor="mobile">Mobile Number</label>
//                         <input type="number" id="mobile" name="mobile" onChange={(e) => handleChange(e)} required />
//                     </div>
//                     <div className="flex-item">
//                         <label htmlFor="city">City</label>
//                         <input type="text" id="city" name="city" onChange={(e) => handleChange(e)} required />
//                     </div>
//                     <div className="flex-item">
//                         <label htmlFor="admission-date">Admission Date</label>
//                         <input type="date" id="admission-date" name="admissiondate" onChange={(e) => handleChange(e)} required />
//                     </div>
//                     <div className="flex-item">
//                         <label htmlFor="slot">Slot</label>
//                         {/* <input type="text" id="slot" name="slot" /> */}
//                         <select name="slot" id="slot" onChange={(e) => handleChange(e)} required >
//                             <option value="morning">Morning</option>
//                             <option value="evening">Evening</option>
//                         </select>
//                     </div>
//                     <div className="flex-item">
//                         <button type="submit" className="submit" >Book Appointment</button> 
//                     </div>
//                     {error != "" && <span className="error">{error}</span>}
//                 </div>
//             </form>
//             { sucess && <Success message="Appointment Successfull"/>}
//         </div>
//     )
// }

// export default App;