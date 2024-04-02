import { useEffect, useState } from 'react'
import { useRef } from 'react'
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import Info from "./Info.jsx"

function Home() {
    const [user,setUser]=useState({});
    

    useEffect(()=>{localStorage.setItem("currentUser", JSON.stringify({"name":"Bret","password":"hildegard.org"}));
    fetch(`localhost8080/todos?username=${JSON.parse(localStorage.getItem("currentUser")).name}`)
        .then(response => response.json())
        .then(data=>setUser(data))},[])
    const navigate=useNavigate()
    function logOut(){
        localStorage.removeItem("currentUser");
        navigate("/login");
    }


    return(
        <>
        <h1>{user.name}</h1>
        <Link to={{ pathname: "/home/user/1/info" , state: { user: user} }}>Info</Link>
        <Link to="/posts">Posts</Link>
        <Link to={{ pathname: "/home/user/1/todos", state: { id: user.id } }}>Todos</Link>
          
      
      
        
        <button onClick={logOut()}>Log Out</button>
        </>
    )
  }
  
  export default Home