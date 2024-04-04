import React, { useState } from 'react'
import { CommentClass } from '../CommentClass';
import "../style.css";

function AddNewComment(props) {
    const [name, setName] = useState('');
    const [body, setBody] = useState('')
    const email=JSON.parse(localStorage.getItem("currentUser")).email

    async function addNewComment() {

        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextCommentId
            });
        const comment = new CommentClass(id, props.postId, name, email, body);
        const urlPost = `http://localhost:3000/comments`;
        fetch(urlPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        }).then(response => {
            response.json();
        }).then(props.addToArr(comment)).catch(() => { console.log("adding fail") })
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextCommentId": id + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
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