import { useEffect, useState, useContext } from 'react'
import {
    Link,
    useNavigate
} from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../style.css";


function Home() {
    const { userID } = useContext(UserContext);
    const name = JSON.parse(localStorage.getItem("currentUser")).name

    const navigate = useNavigate()
    function logOut() {
        localStorage.removeItem("currentUser");
        navigate("/login");
    }

    return (
        <>
            <h1>{name}</h1>
            <Link to={{ pathname: `/user/${userID}/info` }}>Info</Link>
            <br />
            <Link to={{ pathname: `/user/${userID}/albums` }} >Albums</Link>
            <br />
            <Link to={{ pathname: `/user/${userID}/posts` }}>Posts</Link>
            <br />
            <Link to={{ pathname: `/user/${userID}/todos` }}>Todos</Link>
            <br />
            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export default Home