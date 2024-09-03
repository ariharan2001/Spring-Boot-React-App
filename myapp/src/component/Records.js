import React, { useEffect,useState } from "react";
import axios from "axios";
import "../css/admin.css"
import UserIcon from "./UserIcon";
import Popup from "./Popup";

const Records = () => {

    const [record, setRecord] = useState([]);
    const [date, setDate] = useState(getCurrentDateFormatted());
    const [status1, setStatus1] = useState("all");
    const [status2, setStatus2] = useState("all");
    const [close, setClose] = useState(true);
    const [data, setData] = useState({});

    const token = localStorage.getItem('token');

    useEffect(() => {

        if(record.length == 0)
            axios.get("http://localhost:8080/getallrecords", {headers:{'Authorization': token }}).then((response)=>{
                console.log(response);
                setRecord([...response.data])
                console.log(record)
            })

    },[])

    function changeStatus(status){

        axios.post("http://localhost:8080/updatestatus", {...data, status: status} ,{headers:{'Authorization': token }}).then((response)=>{
            console.log("update status successfull");
            setClose(true);
        })

        
    }

    function handleEdit(dat){

        setData(dat);
        setClose(false);

    }

    return(
        <div style={styles.recordCon}>


            <div style={styles.dateItem}>
                <input type="date" id="admission-date" name="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.date} />
            </div>

            <div style={styles.filter}>
                <div>Morning Slots</div>
                <div style={{display:"flex"}}>
                    <select style={{borderRadius:"0.5rem", cursor:"pointer", fontSize:"0.8rem", padding:"5px"}} onChange={(e)=>{setStatus1(e.target.value)}}>
                        <option>all</option>
                        <option>pending</option>
                        <option>approved</option>
                        <option>cancelled</option>
                    </select>
                </div>
            </div>

            <div style={styles.slot}>
                {
                    record.filter( it => it.slot === "morning" && it.admissiondate === date && (it.status === status1 || status1 === "all") ).map((item) => {
                            return (
                                <div key={item.id} style={styles.flexItem}>
                                    
                                    <div style={{display:"flex", gap:"10px"}}>
                                        <div style={{marginBottom:"0px", display:"flex", alignItems:"center"}}><UserIcon/></div>
                                        <div style={{display:"flex", flexDirection:"column", gap: "2px"}}>
                                            <span>{item.name} <span style={{fontSize: "0.8rem"}}>({item.mobile})</span></span>
                                            <span style={{fontSize: "0.6rem", fontWeight: 40}}>{item.city}</span>
                                        </div>
                                    </div>

                                    <div style={{display:"flex", gap: "1rem"}}>
                                        {item.status == "pending" && <div style={{fontSize:"0.9rem", padding: "8px", border:"0.5px solid orange", borderRadius:"1rem", background:"#FFFACD", color:"#FFA500"}}>
                                            {item.status}
                                        </div>}

                                        {item.status == "approved" && <div style={{fontSize:"0.9rem", padding: "8px", border:"0.5px solid green", borderRadius:"1rem", background:"#90EE90", color:"#28a745"}}>
                                            {item.status}
                                        </div>}

                                        {item.status == "cancelled" && <div style={{fontSize:"0.9rem", padding: "8px", border:"0.5px solid red", borderRadius:"1rem", background:"#FFB6C1", color:"#DC3545"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "pending" && <span style={{cursor:"pointer",display:"flex", alignItems:"center"}} onClick={()=>{handleEdit(item)}}><UserIcon name="edit" /></span>}
                                    </div>
                                    
                                </div>
                            )
            
                    })
                }
                
                {
                    record.filter((item) => item.admissiondate === date && item.slot === "morning" && (item.status === status1 || status1 === "all") ).length==0 && 
                        <div style={styles.empty}>
                            <div className="empty-bg-pic"></div>
                        </div>
                }
            </div>

            <div style={styles.filter}>
                <div>Evening Slots</div>
                <div style={{display:"flex"}}>
                    <select style={{borderRadius:"0.5rem", cursor:"pointer", fontSize:"0.8rem", padding:"5px"}} onChange={(e)=>{setStatus2(e.target.value)}}>
                        <option>all</option>
                        <option>pending</option>
                        <option>approved</option>
                        <option>cancelled</option>
                    </select>
                </div>
            </div>

            <div style={styles.slot}>
                {
                    record.filter( it => it.slot === "evening" && it.admissiondate === date && (it.status === status2 || status2 === "all") ).map((item) => {
                            return (
                                <div key={item.id} style={styles.flexItem}>
                                    
                                    <div style={{display:"flex", gap:"10px"}}>
                                        <div style={{marginBottom:"0px", display:"flex", alignItems:"center"}}><UserIcon/></div>
                                        <div style={{display:"flex", flexDirection:"column", gap: "2px"}}>
                                            <span>{item.name} <span style={{fontSize: "0.8rem"}}>({item.mobile})</span></span>
                                            <span style={{fontSize: "0.6rem", fontWeight: 40}}>{item.city}</span>
                                        </div>
                                    </div>

                                    <div style={{display:"flex", gap: "1rem"}}>
                                        {item.status == "pending" && <div style={{fontSize:"0.9rem", padding: "8px", border:"0.5px solid orange", borderRadius:"1rem", background:"#FFFACD", color:"#FFA500"}}>
                                            {item.status}
                                        </div>}

                                        {item.status == "approved" && <div style={{fontSize:"0.9rem", padding: "8px", border:"0.5px solid green", borderRadius:"1rem", background:"#90EE90", color:"#28a745"}}>
                                            {item.status}
                                        </div>}

                                        {item.status == "cancelled" && <div style={{fontSize:"0.9rem", padding: "8px", border:"0.5px solid red", borderRadius:"1rem", background:"#FFB6C1", color:"#DC3545"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "pending" && <span style={{cursor:"pointer",display:"flex", alignItems:"center"}} onClick={()=>{handleEdit(item)}}><UserIcon name="edit" /></span>}
                                    </div>
                                    
                                </div>
                            )
            
                    })
                }
                
                {
                    record.filter((item) => item.admissiondate === date && item.slot === "evening" && (item.status === status2 || status2 === "all") ).length==0 && 
                        <div style={styles.empty}>
                            <div className="empty-bg-pic"></div>
                        </div>
                }
            </div>

        

            { !close && <Popup data={data} onClose={()=>{setClose(true)}} changeStatus={changeStatus} />}
            
        </div>
    );
}

const styles = {
    recordCon: {
        display: "flex",
        flexDirection: "column",
        width: "35%",
        height: "100%",
        background: "#f4f4f4",
        overflowY: "auto"
    },
    flexItem: {
        display: "flex",
        justifyContent: "space-between",
        width: "90%",
        padding: "1rem",
        height: "fit-content",
        background: "white",
        borderRadius: "5px",
        margin: "0.5rem 1rem 0.5rem 1rem"
    },
    date: {
        cursor: "pointer",
        width: "8rem",
        height: "2rem",
        textAlign: "center",
        borderRadius: "5px"
    },
    dateItem: {
        display: "flex",
        justifyContent: "center",
        padding: "0.5rem 1rem 0rem 1rem"
    },
    slot: {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        // justifyContent: "center",
        // alignContent: "center",
        // alignItems: "center",
        width: "100%",
        height: "20rem",
    },
    filter: {
        display:"flex",
        padding: "1rem",
        justifyContent: "space-between"
    },
    empty: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "1rem",
        alignItems: "center",
        background: "white",
        width: "70%",
        height: "50%",
        marginTop: "10%",
        marginLeft: "10%",
        // overflow: "hidden"
    }
}

const getCurrentDateFormatted = () => {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), add 1 to make it 1-12
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day (1-31)
  
    return `${year}-${month}-${day}`;
};


export default Records;