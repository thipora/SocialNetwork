import React from 'react'
import { useState } from 'react'
import {UserObject} from'../objects/User.js'
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import "../css/style.css";



function Details() {
    const [username, setUsername]=useState("")
    const [phone, setPhone]=useState(null)
    const [address, setAddress]=useState("")
    const navigate=useNavigate()
    const location = useLocation();
    const email = location.state.email;

    async function postNewUser() {
      try {
        const user = new UserObject(username, email, address, phone);
        await fetch("http://localhost:8080/users", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          },
            body: JSON.stringify(user),
          }).then(response => response.json())
          .then(data => {
            const id = data.insertId;
            const currentUser = {
              "id": `${id}`,
              "username": `${username}`,
              "email": `${email}`,
              "address": `${address}`,
              "phone": `${phone}`
              };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            navigate(`/user/${id}/home`);
        });
      } catch (error) {
        console.error("Error in postNewUser:", error);
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