import React, { useState } from 'react';
import axios from 'axios';
import "../css/rating.css"
import Success from './Success';
import Button from '../component/Button';
import UserIcon from '../component/UserIcon';

const Rating = ({ maxRating = 5, setIsOpen }) => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("")
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false);

  const username = capitalizeFirstLetter(localStorage.getItem('username'));
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const date = getCurrentDateFormatted();

  const handleSubmit = () => {

    if(rating == 0){
        setError("Rating must be set...")
        return;
    }

    if(comment == ""){
        setError("please leave comment...")
        return;
    }

    axios.post("http://localhost:8080/updatereview", {email: email, review: rating, comment: comment},{headers:{'Authorization': token }}).then((data)=>{
        console.log(data);
        if(data.data != null){
            setSuccess(true);
            setIsOpen(false);
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        }
    })

  }


  return (

    <div className="rating-container">

      <div style={{display:"flex", justifyContent:"space-between"}}>
          <div style={{display:"flex", gap:"10px"}}>
              <div style={{marginBottom:"0px", display:"flex", alignItems:"center"}}><UserIcon/></div>
              <div style={{display:"flex", flexDirection:"column", gap: "2px", marginTop:"5px"}}>
                  <span>{username}</span>
                  <span style={{fontSize: "0.6rem", fontWeight: 40}}>{date}</span>
              </div>
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
            <div>
              {[...Array(maxRating)].map((_, index) => {
                const ratingValue = index + 1;

                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={{ display: 'none' }} // Hide the radio buttons
                    />
                    <span
                      className={`star ${ratingValue <= (hover || rating) ? "filled" : ""}`}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      style={{fontSize:"1.5rem"}}
                    >
                      &#9733;
                    </span>
                  </label>
                );
              })}
            </div>
          <span style={{fontSize:"0.8rem"}}>Rating: {rating} out of {maxRating}</span>
          </div>
      </div>

      <div style={{width:"95%"}}>
        <textarea id="comment" name="comment" rows="6"  placeholder='Enter Your comment here...' style={{border:"1px solid rgba(0, 0, 0, 0.2)", width:"100%", padding: "1rem 0rem 0rem 1rem"}} onChange={(e)=>setComment(e.target.value)}>
        </textarea>
        {error != "" && <span style={{fontSize:"0.8rem", color:"red", display:"flex", justifyContent:"center"}}>{error}</span>}
      </div>

      
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Button onClick={() => {setIsOpen(false)}} label="Close" style={{padding:"8px 10px", fontSize:"0.8rem", width:"20%", backgroundColor: "rgba(255, 0, 0, 0.7)"}} />
        <Button onClick={handleSubmit} label="Submit" style={{padding:"8px 10px", fontSize:"0.8rem", width: "20%"}} />
      </div>

      {success && <Success message="Rating Update Successfull"/>}
    </div>
    
  );
};

export default Rating;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getCurrentDateFormatted = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), add 1 to make it 1-12
  const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day (1-31)

  return `${year}-${month}-${day}`;
};