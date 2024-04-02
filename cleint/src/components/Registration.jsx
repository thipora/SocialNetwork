import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import {
  useNavigate
} from "react-router-dom";
import Details from './Details';


function Register() {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [verifyPassword, setVerifyPassword] = useState(null);
    

    function isValidUser(){
        if(password===verifyPassword){
            fetch(`https://localhost:8080/users?username=${name}&&website=${password}`)
            .then(response => response.json())
            if(!data){
                return(
                  <Details password={password} uName={name}/>
                )
            }
            alert("User name is invalid");
        }
       else{
        alert("Invalid password");
       }
    }

  return (
    <>
      <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <input type='password' placeholder='Verify Password' onChange={(e) => setVerifyPassword(e.target.value)}/>
      <button onClick={isValidUser}>Register</button>
    </>
  )
}

export default Register