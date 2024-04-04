import { React, useState } from "react";
import "../style.css";



function UpdateComment(props) {
    const comment = props.comment;
    const [name, setName] = useState(comment.name);
    const [body, setBody] = useState(comment.body)

    async function updateComment() {
        try {
            const response = await fetch(`http://localhost:3000/comments?id=${comment.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    body: body
                }),
            });
            props.updateArr(comment.id, name, body);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedComment = await response.json();
        } catch (error) {
            console.error('Error updating Comment:', error);
        }

    }
    return (<>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit" onClick={updateComment}>Update</button>
    </>)
}

export default UpdateComment