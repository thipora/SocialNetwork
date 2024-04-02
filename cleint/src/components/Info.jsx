import { useState, useEffect } from 'react'
import React from 'react';
import { useRef } from 'react'
import {
    Link,
  useLocation,
  useNavigate
} from "react-router-dom";


function Info() {
    const navigate=useNavigate()
    const [user,setUser]=useState({});

    // const location=useLocation()
    // const {state}=location
    // const user=state

    useEffect(()=>{
    fetch(`localhost8080/todos?username=${JSON.parse(localStorage.getItem("currentUser")).name}`)
        .then(response => response.json())
        .then(data=>setUser(data))},[])
   
    function hideInfo(){
        navigate(`/home/users/${user.id}`)
    }
   return(
    <>
        <p> name: {user.name}</p>
        <p> user name: {user.userName}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p> password: {user.website}</p>
        <p>adress:</p>
        <p> street: {user.adress.street}  suite:{user.adress.suite} zipcode:{user.adress.zipcode}</p>
        <p> geo:  lat:{user.adress.geo.lat}  lng:{user.adress.geo.lng}</p>
        <p>company:</p>
        <p> name: {user.company.name} catch parse:{user.company.catchParse} bs:{user.company.bs}</p>
        <button onClick={hideInfo()}>Hide info</button>
        
    </>
   )
 }
  
  export default Info