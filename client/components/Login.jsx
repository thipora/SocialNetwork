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
    const hash_password = generatePasswordHash(password);

    function login(){
      fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email, "password_hash": hash_password})
      })
      .then(response => {
        if(!response.ok)
          throw new Error('error, please try egain whith anouther email or password or sing up')
        return response.json();
      })
      .then(data => {
        localStorage.setItem("TOKEN", data.accessToken);
      })
      .then(() => getUser())
      .catch(error => {
          alert(error.message);
        });
    }


    function getUser(){
      const token = localStorage.getItem('TOKEN');
      fetch(`http://localhost:8080/users?email=${email}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if(!response.ok)
          throw new Error('ERROR: ' + response.status + ' ' + response.message)
        return response.json();
      })
      .then(data => {
        const currentUser = data[0];
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateUserID();
        navigate(`/user/${currentUser.id}/home`);
      }).catch(error => {
          alert(error.message);
        });
    }


  return (
    <>
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={login}>Login</button>
      <Link to="/register">New User?</Link>
    </>
  )
}

export default Login