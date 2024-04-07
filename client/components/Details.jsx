import React from 'react'
import { useState, useContext } from 'react'
import {UserObject} from'../objects/User.js'
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import "../css/style.css";
import { UserContext } from '../UserProvider.jsx';



function Details() {
    const [username, setUsername]=useState("")
    const [phone, setPhone]=useState(null)
    const [address, setAddress]=useState("")
    const { updateUserID } = useContext(UserContext);
    const navigate=useNavigate()
    const location = useLocation();
    const email = location.state.email;
    const token = localStorage.getItem('TOKEN');

    async function postNewUser() {
      try {
        const currentUser = new UserObject(username, email, address, phone);
        fetch("http://localhost:8080/users", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
            body: JSON.stringify(currentUser),
          }).then(response => {
            if(!response.ok)
              throw new Error(`Error ${response.status}: ${response.statusText}`);  
              return response.json();
            })
          .then(data => {
            currentUser.id = data.insertId;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            updateUserID();
            navigate(`/user/${currentUser.id}/home`);
        });
      } catch (error) {
        alert(error.message);
      }
    }

  return (
    <>
        <input type='text' placeholder='username'onChange={(e) => setUsername(e.target.value)}/>
        <input type='number' placeholder='phone' onChange={(e) => setPhone(e.target.value)}/>
        <input type='text' placeholder='address' onChange={(e) => setAddress(e.target.value)}/>
        <button onClick={postNewUser}>Submit</button>

    </>
  )
}

export default Details