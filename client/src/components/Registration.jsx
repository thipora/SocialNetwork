import React from 'react'
import { useState } from 'react'
import {
  useNavigate
} from "react-router-dom";
import "../style.css";

function Register() {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [verifyPassword, setVerifyPassword] = useState(null);
    const navigate=useNavigate()
    

    function isValidUser(){
        if(password===verifyPassword){
            fetch(`http://localhost:3000/users?username=${name}&&website=${password}`)
            .then(response => response.json())
            .then(data=>
              {if(data[0] ==null){
              navigate("/register/details", {state:{name:name ,password:password}})
             }
              else{
                alert("User name is invalid");}
            })   
        }
       else{
        alert("Invalid password");
       }
    }

  return (
    <>
      <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}required/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}required/>
      <input type='password' placeholder='Verify Password' onChange={(e) => setVerifyPassword(e.target.value)} required/>
      <button type='submit' onClick={isValidUser}>Register</button>

    </>
  )
}

export default Register