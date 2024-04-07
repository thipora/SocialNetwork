import React, { useState } from 'react'
import { CommentClass } from '../objects/CommentClass.js';
import "../css/style.css";

function AddNewComment(props) {
    const [name, setName] = useState('');
    const [body, setBody] = useState('')
    const email=JSON.parse(localStorage.getItem("currentUser")).email;
    const token = localStorage.getItem("TOKEN");

    async function addNewComment() {
        const comment = new CommentClass(props.postId, name, email, body);
        const urlPost = `http://localhost:8080/comments`;
        await fetch(urlPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(comment),
        }).then(response => {
            if(!response.ok)
                throw new Error(`Error ${response.status}: ${response.statusText}`);  
            return response.json();
        })
        .then(data => {
            comment.id = data.insertId;
            props.addToArr(comment);
        })
        .catch(error => alert(error.message))
    }


    return (
        <>
            <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} required />
            <input type='text' placeholder='comment' onChange={(e) => setBody(e.target.value)} required/>
            <button type="submit" onClick={addNewComment}>Add</button>

        </>
    )

}

export default AddNewComment