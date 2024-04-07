import React from 'react'
import CryptoJS from 'crypto-js';
import { useState } from 'react'
import {
  useNavigate
} from "react-router-dom";
import "../css/style.css";

function Register() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [verifyPassword, setVerifyPassword] = useState(null);
    const navigate=useNavigate()

    const generatePasswordHash = (password) => {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      return hashedPassword;
    };
    const hash_password = generatePasswordHash(password);

    function isValidUser() {
      if (password === verifyPassword) {
          fetch(`http://localhost:8080/passwords?email=${email}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            if(Object.values(data[0])[0]==1){
              throw new Error(`you exist user`);  
            }
          })
          .then(() => postPasswords())
          .then(() => navigate("/register/details", { state: { email: email } }))
          .catch(error => {
            alert(error.message);
          });
      } else {
          alert("Passwords do not match");
      }
  }

  function postPasswords(){
    fetch(`http://localhost:8080/passwords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email, "password_hash": hash_password})
    })
    .then(response => response.json())
    .then(() => getToken())
    .catch(error => {
      alert("fail regist passwords");
    });
  }
  
  function getToken(){
    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email, "password_hash": hash_password})
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("TOKEN", data.accessToken);
    })
    .catch(error => {
      alert("An error occurred, try again!");
    });
  }

  return (
    <>
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}required/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}required/>
      <input type='password' placeholder='Verify Password' onChange={(e) => setVerifyPassword(e.target.value)} required/>
      <button type='submit' onClick={isValidUser}>Register</button>

    </>
  )
}

export default Register