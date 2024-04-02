import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import {
  Navigate,
  useNavigate, Link
} from "react-router-dom";

 function Login() {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => {updateState({});}, []);
    
    const navigate=useNavigate()
    function isValidUser(){
        fetch(`http://localhost:8080/users?username=${name}&&website=${password}`)
        .then(response => response.json())
        .then(data => {
          if (data !== null ) {
            localStorage.setItem("currentUser", JSON.stringify(data[0])); // Assuming you want to store the first user from the response
            // forceUpdate(); // Assuming forceUpdate is a function you defined elsewhere
            navigate(`/home/user/${data[0].id}`);
          } else {
            alert("A problem occurred, try again!");
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          alert("An error occurred, try again!");
        });
       
      }

  return (
    <>
      
      <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={isValidUser}>Login</button>

      <Link to="/register">New User?</Link>
    </>
  )
}

export default Login