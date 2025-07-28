import { useEffect,useState } from "react";
import axios from "axios";
import "../css/admin.css"
import UserIcon from "./UserIcon";
import Popup from "./Popup";

const Records = () => {

    const [record, setRecord] = useState([]);
    const [date, setDate] = useState(getCurrentDateFormatted());
    const [status1, setStatus1] = useState("all");
    const [status2, setStatus2] = useState("all");
    const [slot, setSlot] = useState("morning")
    const [close, setClose] = useState(true);
    const [data, setData] = useState({});

    const token = localStorage.getItem('token');

    useEffect(() => {

        if(record.length === 0)
            axios.get(`${process.env.REACT_APP_API_URL}/getallrecords`, {headers:{'Authorization': token }}).then((response)=>{
                console.log(response);
                setRecord([...response.data])
                console.log(record)
            })

    },[])

    function changeStatus(status){

        axios.post(`${process.env.REACT_APP_API_URL}/updatestatus`, {...data, status: status} ,{headers:{'Authorization': token }}).then((response)=>{
            console.log("update status successfull");
            setClose(true);
        })

        
    }

    function handleEdit(dat){

        setData(dat);
        setClose(false);

    }

    return(
        <div className="recordCon">


            <div className="dateItem">
                <input type="date" id="admission-date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className="date" />
            </div>

            <div className="filter">
                <div style={{textJustify:"center"}}>
                    <label>
                        <input type="radio" value="morning" checked={slot=="morning"} onClick={()=>{setSlot("morning")}} />
                        Morning
                    </label>
                    <label>
                        <input type="radio" value="evening" checked={slot=="evening"} onClick={()=>{setSlot("evening")}} />
                        Evening
                    </label>
                </div>
                <div style={{display:"flex"}}>
                    <select style={{borderRadius:"0.5rem", cursor:"pointer", fontSize:"0.8rem", padding:"5px"}} onChange={(e)=>{setStatus1(e.target.value)}}>
                        <option>all</option>
                        <option>pending</option>
                        <option>approved</option>
                        <option>cancelled</option>
                    </select>
                </div>
            </div>

            <div className="slot">
                {
                    record.filter( it => it.slot === slot && it.admissiondate === date && (it.status === status1 || status1 === "all") ).map((item) => {
                            return (
                                <div key={item.id} className="flexItem flexitem12">
                                    
                                    <div style={{display:"flex", gap:"10px"}}>
                                        <div style={{marginBottom:"0px", display:"flex", alignItems:"center"}}><UserIcon/></div>
                                        <div style={{display:"flex", flexDirection:"column", gap: "2px"}}>
                                            <span>{item.name} <span style={{fontSize: "0.8rem"}}>({item.mobile})</span></span>
                                            <span style={{fontSize: "0.6rem", fontWeight: 40}}>{item.city}</span>
                                        </div>
                                    </div>

                                    <div style={{display:"flex", gap: "1rem"}}>
                                        {item.status === "pending" && <div style={{ padding: "8px", border:"0.5px solid orange", borderRadius:"1rem", background:"#FFFACD", color:"#FFA500"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "approved" && <div style={{ padding: "8px", border:"0.5px solid green", borderRadius:"1rem", background:"#90EE90", color:"#28a745"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "cancelled" && <div style={{padding: "8px", border:"0.5px solid red", borderRadius:"1rem", background:"#FFB6C1", color:"#DC3545"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "pending" && <span style={{cursor:"pointer",display:"flex", alignItems:"center"}} onClick={()=>{handleEdit(item)}}><UserIcon name="edit" /></span>}
                                    </div>
                                    
                                </div>
                            )
            
                    })
                }
                
                {
                    record.filter((item) => item.admissiondate === date && item.slot === "morning" && (item.status === status1 || status1 === "all") ).length===0 && 
                        <div className="empty">
                            <div className="empty-bg-pic"></div>
                        </div>
                }
            </div>

            {/* <div className="filter">
                <div>Evening Slots</div>
                <div style={{display:"flex"}}>
                    <select style={{borderRadius:"0.5rem", cursor:"pointer", fontSize:"0.8rem", padding:"5px"}} onChange={(e)=>{setStatus2(e.target.value)}}>
                        <option>all</option>
                        <option>pending</option>
                        <option>approved</option>
                        <option>cancelled</option>
                    </select>
                </div>
            </div> */}

            {/* <div className="slot">
                {
                    record.filter( it => it.slot === "evening" && it.admissiondate === date && (it.status === status2 || status2 === "all") ).map((item) => {
                            return (
                                <div key={item.id} className="flexItem">
                                    
                                    <div style={{display:"flex", gap:"10px"}}>
                                        <div style={{marginBottom:"0px", display:"flex", alignItems:"center"}}><UserIcon/></div>
                                        <div style={{display:"flex", flexDirection:"column", gap: "2px"}}>
                                            <span>{item.name} <span style={{fontSize: "0.8rem"}}>({item.mobile})</span></span>
                                            <span style={{fontSize: "0.6rem", fontWeight: 40}}>{item.city}</span>
                                        </div>
                                    </div>

                                    <div style={{display:"flex", gap: "1rem"}}>
                                        {item.status === "pending" && <div style={{ padding: "8px", border:"0.5px solid orange", borderRadius:"1rem", background:"#FFFACD", color:"#FFA500"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "approved" && <div style={{ padding: "8px", border:"0.5px solid green", borderRadius:"1rem", background:"#90EE90", color:"#28a745"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "cancelled" && <div style={{ padding: "8px", border:"0.5px solid red", borderRadius:"1rem", background:"#FFB6C1", color:"#DC3545"}}>
                                            {item.status}
                                        </div>}

                                        {item.status === "pending" && <span style={{cursor:"pointer",display:"flex", alignItems:"center"}} onClick={()=>{handleEdit(item)}}><UserIcon name="edit" /></span>}
                                    </div>
                                    
                                </div>
                            )
            
                    })
                }
                
                {
                    record.filter((item) => item.admissiondate === date && item.slot === "evening" && (item.status === status2 || status2 === "all") ).length===0 && 
                        <div className="empty">
                            <div className="empty-bg-pic"></div>
                        </div>
                }
            </div> */}

            { !close && <Popup data={data} onClose={()=>{setClose(true)}} changeStatus={changeStatus} />}
            
        </div>
    );
}

const styles = {
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
        width: "100%",
        height: "30%",
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