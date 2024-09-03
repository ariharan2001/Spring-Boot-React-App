import React, { useEffect,useState } from "react";
import axios from "axios";
import "../css/admin.css"

const Admin = () => {

    const [record, setRecord] = useState([])

    const [date, setDate] = useState(getCurrentDateFormatted())

    const token = localStorage.getItem('token');

    useEffect(() => {

        if(record.length == 0)
            axios.get("http://localhost:8080/getallrecords", {headers:{'Authorization': token }}).then((response)=>{
                console.log(response);
                setRecord([...response.data])
                console.log(record)
            })

    },[])

    return(
        <div className="record-con">


            <div className="flex-item">
                <input type="date" id="admission-date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            {/* <select defaultValue="today" onChange={(e) => setSelect(e.target.value)} className="date-dropdown flex-item">
                <option value="previous-day">previous day</option>
                <option value="today">today</option>
                <option value="next-day">Next day</option>
            </select> */}

            <div className="flex-item">

                <table cellPadding="10" className="table">
                    <thead>
                        <tr>
                            <th>Patient Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Mobile No</th>
                            <th>City</th>
                            <th>Admission Date</th>
                            <th>Slot</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                    
                        record.map((item) => {
                        
                            if( item.admissiondate == date )
                                return (<tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.city}</td>
                                    <td>{item.admissiondate}</td>
                                    <td>{item.slot}</td>
                                    <td>{item.review}</td>
                                </tr>);
                            return null

                        })
                        
                    }
                    {
                        record.filter((item) => item.admissiondate == date).length==0 && 
                        <tr>
                        <td colSpan="8" className="empty">No appointment is registered...</td>
                        </tr>

                    }
                    </tbody>
                </table>

            </div>

            
        </div>
    );
}

const getCurrentDateFormatted = () => {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), add 1 to make it 1-12
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day (1-31)
  
    return `${year}-${month}-${day}`;
};


export default Admin;