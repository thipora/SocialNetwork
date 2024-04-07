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

    function isValidUser() {
      if (password === verifyPassword) {
          const hashPassword = generatePasswordHash(password);
  
          fetch(`http://localhost:8080/passwords/${email}`)
              .then(response => response.json())
              .then(data => {
                  if (data.length === 0) {
                      fetch("http://localhost:8080/passwords", {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ email: email, password: hashPassword }),
                      })
                          .then(response => response.json())
                          .then(() => getToken())
                          .then(navigate("/register/details", { state: { email: email } }))
                          .catch(error => {
                              console.log("Error creating new user:", error);
                              alert("An error occurred while creating the user. Please try again.");
                          });
                  } else {
                    console.log(data);
                      alert("User already exists");
                  }
              })
              .catch(error => {
                  console.error("Error checking if user exists:", error);
                  alert("An error occurred while checking if user exists. Please try again.");
              });
      } else {
          alert("Passwords do not match");
      }
  }
  
  function getToken(){
    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email, "password_hash": generatePasswordHash(password)})
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("TOKEN", data.accessToken);
    })
    .then(() => getUser())
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