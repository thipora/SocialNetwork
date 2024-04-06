import React from 'react'
import CryptoJS from 'crypto-js';
import { useState, useEffect, useContext } from 'react'
import {
  useNavigate, Link
} from "react-router-dom";
import "../css/style.css";
import { UserContext } from '../UserProvider.jsx';

 function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate=useNavigate()
    const { updateUserID } = useContext(UserContext);

    const generatePasswordHash = (password) => {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      return hashedPassword;
    };
    
    function isValidUser(){
      fetch(`http://localhost:8080/passwords/${email}`)
      .then(response => response.json())
      .then(data => {
        if (data[0].password_hash ==  generatePasswordHash(password)) {
          fetch(`http://localhost:8080/users/${email}`)
          .then(response => response.json())
          .then(data => {
            const currentUser = data[0];
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            updateUserID();
            navigate(`/user/${currentUser.id}/home`);
          })
        } else {
          alert("A problem occurred, try again!");
        }
      })
      .catch(error => {
        console.log("Error fetching user data:", error);
        alert("An error occurred, try again!");
      });
    }


  return (
    <>
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={isValidUser}>Login</button>
      <Link to="/register">New User?</Link>
    </>
  )
}

export default Login