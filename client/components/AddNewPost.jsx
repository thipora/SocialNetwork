import React, { useState, useContext } from 'react'
import { PostObject } from '../objects/Post';
import { UserContext } from '../UserProvider';
import "../css/style.css";

function AddNewPost(props) {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const { userID } = useContext(UserContext);
    async function addNewPost() {
        let post = new PostObject(userID, title, body);
        fetch("http://localhost:8080/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        }).then(response => response.json())
        .then(data => {
            post.id = data.insertId;
            props.addToArr(post);
        })
        .catch(() => { console.log("adding fail") })
    }

    return (
        <>
            <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)} required />
            <input type='text' placeholder='post' onChange={(e) => setBody(e.target.value)} required />
            <button type='submit' onClick={addNewPost}>Add</button>

        </>
    )

}

export default AddNewPost