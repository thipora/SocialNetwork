import React, { useState } from 'react'
import Post from './Post';

function AddNewPost(props){
  

    
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('')

    function addNewPost(){
        const post=new Post(props.id,title,body)
        const urlPost = `https://localhost:8080/posts`;

        fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
          }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' placeholder='post' onChange={(e) => setBody(e.target.value)}/>

        <button onClick={addNewPost}>Add</button>
        </>
    )

}

export default AddNewPost