import { React, useState } from "react";
import "../css/style.css";


function UpdatePost(props) {
    const post = props.post;
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const token = localStorage.getItem("TOKEN");

    async function updatePost() {
        try {
            const response = await fetch(`http://localhost:8080/posts?id=${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }            
            props.updateArr(post.id, title, body);
        } catch (error) {
            alert(error.message);
        }
0   }

    return (<>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit" onClick={updatePost}>Update</button>
    </>)
}

export default UpdatePost