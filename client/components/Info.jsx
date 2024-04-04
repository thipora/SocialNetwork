import React from 'react';
import { useContext } from 'react';
import {
  useNavigate
} from "react-router-dom";
import "../css/style.css";
import { UserContext } from '../UserProvider';


function Info() {
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem("currentUser"))
    const { userID } = useContext(UserContext);


    function hideInfo(){
        navigate(`/user/${userID}/home`)
    }
   return(
    <>
        <p> user name: {user.username}</p>
        <p> email: {user.email}</p>
        <p> phone: {user.phone}</p>
        <p> address: {user.address}</p>
        <button onClick={hideInfo}>Hide info</button>
        
    </>
   )
   }
  
  export default Info