import React from 'react'
import CryptoJS from 'crypto-js';
import { useState, useEffect, useContext } from 'react'
import {
  useNavigate, Link
} from "react-router-dom";
import "../css/style.css";

 function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
      if (userId) {
        navigate(`/user/${userId}/home`);
      }
    }, [userId, navigate]);

    const generatePasswordHash = (password) => {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      return hashedPassword;
    };

    // function isValidUser(){
    //     fetch(`http://localhost:8080/passwords/id=${email}`)
    //     .then(response => {console.log(response); response.json();})
    //     .then(data => {
    //       console.log("data: " + data);
    //       console.log("data[0]: " + data[0]);
    //       if (data[0].password_hash ==  generatePasswordHash(password)) {
    //         alert("scsseful");
    //       //   localStorage.setItem("currentUser", JSON.stringify({
    //       //     "id": `${data[0].id}`,
    //       //     "name": `${data[0].name}`,
    //       //     "username": `${data[0].username}`,
    //       //     "email": `${data[0].email}`,
            
    //       //         "street": `${data[0].address.street}`,
    //       //         "suite": `${data[0].address.suite}`,
    //       //         "city": `${data[0].address.city}`,
    //       //         "zipcode": `${data[0].address.zipcode}`,
            
    //       //             "lat": `${data[0].address.geo.lat}`,
    //       //             "lng": `${data[0].address.geo.lng}`,
    //       //     "phone": `${data[0].phone}`,

        
    //       //         "Cname": `${data[0].company.name}`,
    //       //         "catchPhrase": `${data[0].company.catchPhrase}`,
    //       //         "bs": `${data[0].company.bs}`
 
    //       // }));
    //       //   setUserId(data[0].id);

    //       } else {
    //         alert("A problem occurred, try again!");
    //       }
    //     })
    //     .catch(error => {
    //       console.error("Error fetching user data:", error);
    //       alert("An error occurred, try again!");
    //     });
       
    //   }
    
    function isValidUser(){
      fetch(`http://localhost:8080/passwords/${email}`)
      .then(response => response.json())
      .then(data => {
        if (data[0].password_hash ==  generatePasswordHash(password)) {
          fetch(`http://localhost:8080/users/${email}`)
          .then(response => response.json())
          .then(data => {
            const currentUser = {
              "id": `${data[0].id}`,
              "username": `${data[0].username}`,
              "email": `${data[0].email}`,
              "address": `${data[0].address}`,
              "phone": `${data[0].phone}`
              };
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
              navigate(`/user/${data[0].id}/home`);
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