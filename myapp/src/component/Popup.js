import React from 'react';
import { useState } from 'react';

const Popup = ({ data, onClose, changeStatus}) => {

  const [status, setStatus] = useState(data.status)

  return (
    <div style={popupOverlayStyle}>
        <div style={popupContentStyle}>
            <div style={{fontWeight:500}}>Update Appointment Status</div>
            <div style={{display:"flex", gap:"1rem", alignItems:"center"}}>
                <span style={{width:"5rem", display: "flex", justifyContent:"flex-start"}}>Patient:</span>
                <span> 
                    <span style={{paddingRight: "5px"}}>{data.name}</span> 
                    <span style={{fontSize:"0.7rem"}}>({data.age})</span>
                </span>
            </div>
            <div style={{display:"flex", gap:"1rem", alignItems:"center", alignContent:"center"}}>
                <span style={{width:"5rem", display: "flex", justifyContent:"flex-start"}}>Contact: </span>
                <span style={{fontSize:"0.9rem",display:"flex", alignItems:"center"}}>{data.mobile} / {data.email}</span>
            </div>
            <div style={{display:"flex", gap:"1rem", alignItems:"center", alignContent:"center"}}>
                <span style={{width:"5rem", display: "flex", justifyContent:"flex-start"}}>City: </span>
                <span style={{display:"flex", alignItems:"center"}}>{data.city}</span>
            </div>
            <div style={{display:"flex", gap:"1rem", alignItems:"center", alignContent:"center"}}>
                <span style={{width:"5rem", display: "flex", justifyContent:"flex-start"}}>Time: </span>
                <span style={{fontSize:"0.9rem",display:"flex", alignItems:"center"}}>{data.admissiondate} & {data.slot}</span>
            </div>
            <div style={{display:"flex", gap:"1rem", alignItems:"center", alignContent:"center"}}>
                <span style={{width:"5rem", display: "flex", justifyContent:"flex-start"}}>Status: </span>
                <span style={{display:"flex"}}>
                    <input type="radio" id="pending" name="status" value="pending" checked={status === 'pending'}  onClick={(e)=>{setStatus(e.target.value)}}  />
                    <label for="pending" style={{cursor:"pointer", color: "orange"}}>Pending</label>
                
                    <input type="radio" id="approved" name="status" value="approved" style={{marginLeft:"1rem"}} checked={status === 'approved'} onClick={(e)=>{setStatus(e.target.value)}}  />
                    <label for="approved" style={{cursor:"pointer", color: "green"}}>Approved</label>
              
                    <input type="radio" id="cancelled" name="status" value="cancelled" style={{marginLeft:"1rem"}} checked={status === 'cancelled'} onClick={(e)=>{setStatus(e.target.value)}}  />
                    <label for="cancelled" style={{cursor:"pointer", color: "red"}}>Cancelled</label>
                </span>
            </div>
            

            <div style={{display:"flex", justifyContent:"flex-end", gap:"1rem", marginTop:"0.5rem"}}>
                <button onClick={onClose} style={{padding:"5px 7px", borderRadius: "10px", width: "20%", border:"1px solid red", background:"#FFB6C1", color:"black", cursor:"pointer"}}>Close</button>
                <button onClick={() => {changeStatus(status)}} style={{padding:"5px 7px", borderRadius: "10px", width: "20%", border:"1px solid green", background:"#90EE90", color:"black", cursor:"pointer"}}>Ok</button>

            </div>
            
        </div>
    </div>
  );
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  width:"25%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
};

export default Popup;
