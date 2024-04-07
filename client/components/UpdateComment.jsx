import { React, useState } from "react";
import "../css/style.css";



function UpdateComment(props) {
    const comment = props.comment;
    const [name, setName] = useState(comment.name);
    const [body, setBody] = useState(comment.body);
    const token = localStorage.getItem("TOKEN");

    async function updateComment() {
        try {
            const response = await fetch(`http://localhost:8080/comments?id=${comment.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    body: body
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            props.updateArr(comment.id, name, body);

        } catch (error) {
            alert(error.message)
        }

    }
    return (<>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit" onClick={updateComment}>Update</button>
    </>)
}

export default UpdateComment