import React from 'react'
import { useState } from 'react'
import {User} from'./../User.js'
import { useRef } from 'react'
import {
  useNavigate
} from "react-router-dom";



function Details(props) {
    const[id,setId]=useState(0)
    const [email, setEmail]=useState("")
    const [name, setName]=useState("")
    const [phone, setPhone]=useState(null)
    const [street, setStreet]=useState("")
    const [suite, setSuite]=useState("")
    const [city, setCity]=useState("")
    const [zipcode, setZipcode]=useState("")
    const [lat, setLat]=useState(null)
    const [lng, setLng]=useState(null)
    const [companyName, setCompanyName]=useState("")
    const [catchParse, setCatchParse]=useState("")
    const [bs, setBs]=useState("")
    const navigate=useNavigate()

    function postNewUser(){
      let user=new User(id,name,props.Uname,email,street,suite,city,zipcode,lat,lng,phone,props.password,companyName,catchParse,bs);
      fetch("https://localhost:8080/users", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(localStorage.setItem("currentUser",user))
    .then( localStorage.setItem("currentUser",response)).then(navigate("/home"))
   
    }

  return (
    <>
    <form>
        <input type='number' placeholder='ID' onChange={(e) => setId(e.target.value)}/>  
        <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' placeholder='name'onChange={(e) => setName(e.target.value)}/>
        <input type='number' placeholder='phone' onChange={(e) => setPhone(e.target.value)}/>
        <p>adress:</p>
        <input type='text' placeholder='street' onChange={(e) => setStreet(e.target.value)}/>
        <input type='text' placeholder='suite' onChange={(e) => setSuite(e.target.value)}/>
        <input type='text' placeholder='city' onChange={(e) => setCity(e.target.value)}/>
        <input type='text' placeholder='zipcode' onChange={(e) => setZipcode(e.target.value)}/>
        <p>geo:</p>
        <input type='number' placeholder='lat' onChange={(e) => setLat(e.target.value)}/>
        <input type='number' placeholder='lng' onChange={(e) => setLng(e.target.value)}/>
        <p>company:</p>
        <input type='text' placeholder='name' onChange={(e) => setCompanyName(e.target.value)}/> 
        <input type='text' placeholder='catchParse' onChange={(e) => setCatchParse(e.target.value)}/>
        <input type='text' placeholder='bs' onChange={(e) => setBs(e.target.value)}/>

        <button onClick={postNewUser()}>Submit</button>
    </form>
    </>
  )
}

export default Details