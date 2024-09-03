import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../css/ratings.css"
import UserIcon from '../component/UserIcon';
import Rating from './Rating';


const Ratings = () => {

  const [records, setRecords] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const token = localStorage.getItem('token')

  useEffect(() => {

    axios.get("http://localhost:8080/getallrecords",{headers:{'Authorization': token }}).then((data) => {
        setRecords(data.data)
        console.log(data)
    })

  },[])

  function handleWriteReview(){
    console.log("Write your review")
    setIsOpen(true)
  }
  
  return (
    <div style={styles.ratings} className='bg-pic'>

        <div style={styles.container} className='rating-div'>

            <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{fontWeight:500}}> Reviews </span>
                <span style={{cursor:"pointer"}} onClick={handleWriteReview}><UserIcon name="edit" /></span>
            </div>

                {
        records.map((item) => {
        if(item.name && item.admissiondate && item.review)
            return(
                <div style={{display:"flex", flexDirection:"column", gap: "10px", padding: "0.7rem"}} className='rating-sub-div'>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div style={{display:"flex", gap:"10px"}}>
                            <div style={{marginBottom:"0px", display:"flex", alignItems:"center"}}><UserIcon/></div>
                            <div style={{display:"flex", flexDirection:"column", gap: "2px"}}>
                                <span>{item.name}</span>
                                <span style={{fontSize: "0.6rem", fontWeight: 40}}>{item.admissiondate}</span>
                            </div>
                        </div>
                        <div>
                            <div>{[...Array(item.review)].map((_, index) => {
                                    return (<span className="star-filled"> &#9733; </span>);
                                })}({item.review})
                            </div>
                        </div>
                    </div>

                    <div style={{fontSize: "0.8rem", lineHeight:"1.5", fontWeight: "400", marginLeft: "1.5rem", color: ""}}>
                        {item.comment}
                    </div>
                </div>)
                })
                }


        </div>


        {/* <div style={styles.gridContainer}>
        {
            records.map((item) =>{
                if(item.name && item.admissiondate && item.review)
                return(
                    <>
                        <div style={styles.gridItem}><span style={{marginBottom:"0px"}}><UserIcon/></span><span>{item.name}</span></div>
                        <div style={styles.gridItem}>{[...Array(item.review)].map((_, index) => {
                            return (<span className="star-filled"> &#9733; </span>);
                        })}({item.review})</div>
                        <div style={styles.gridItem}>Here goes comment!!!</div>
                        <div style={styles.gridItem}>{item.admissiondate}</div>
                        <div style={styles.gridItem }>{item.city}</div>
                        
                    </>
                )
                return null
            })
        }
        </div> */}
        
        { isOpen && <Rating setIsOpen={setIsOpen} />}

    </div>
  );
};

export default Ratings;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        width: "35%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "1.5rem",
        gap: "0.5rem",
        boxSizing: "border-box"
    },
    gridContainer: {
        width: "fit-content",
        // height: "100%",
        display: "grid",
        borderRadius: "5px",
        gridTemplateColumns: "auto auto auto auto auto",
        padding: "10px",
        // backgroundColor: "white"
    },
    gridItem: {
        padding: "10px",
        fontSize: "0.9rem",
        display: "flex",
        gap: "15px"
    },
    ratings: {
        width: "100%"
    },
    flexBox: {
        display: "flex",
        justifyContent: "space-between",
        width: "35%"
    },
    flexItem: {
        display: "flex",
        border: "1px solid black",
        padding: "5px 2px"
    }
}


{/* <table className="ratings-container">
        {
            records.map((item) =>{
                if(item.name && item.admissiondate && item.review)
                return(
                    <tr className='rating-info'>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.admissiondate}</td>
                        <td>{item.city}</td>
                        <td>{[...Array(item.review)].map((_, index) => {
                            return (<span className="star-filled"> &#9733; </span>);
                        })}</td>
                    </tr>
                )
                return null
            })
        }
    </table> */}