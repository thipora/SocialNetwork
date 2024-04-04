import React from 'react';
import { useState,useEffect,useContext } from 'react';
import {
  useNavigate
} from "react-router-dom";
import "../style.css";
import { UserContext } from '../UserProvider';


function Info() {
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem("currentUser"))
    const { userID } = useContext(UserContext);


    function hideInfo(){
        navigate(`/user/${userID}/home`)
    }
   return(
    <>
        <p> name: {user.name}</p>
        <p> user name: {user.username}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p>adress:</p>
        <p> street: {user.street} <br/> suite:{user.suite} <br/> zipcode:{user.zipcode}</p>
        <p> geo:<br/>  lat:{user.lat}  lng:{user.lng}</p>
        <p>company:</p>
        <p> name: {user.Cname}</p><p> catch phrase:{user.catchPhrase} </p><p>bs:{user.bs}</p>
        <button onClick={hideInfo}>Hide info</button>
        
    </>
   )
   }
  
  export default Info