import {React, useState} from "react";


function UpdatePost(props){

    const [title,setTitle]=useState(props.post.title);
    const[body,setBody]=useState(props.post.body)
    function updatePost(){
        fetch(`http://localhost:8080/todos?id=${props.post.id}`, {
              method: 'PUT',
         headers: {
        'Content-Type': 'application/json',
         },
        body: JSON.stringify({
            title: title,
            body: body
         }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error updating TODO:', error);
    });
    }
    return( <>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)}/>
        <button onClick={updatePost}>Update</button>
        </>)
}

export default UpdatePost