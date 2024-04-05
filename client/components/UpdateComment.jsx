import { React, useState } from "react";
import "../css/style.css";



function UpdateComment(props) {
    const comment = props.comment;
    const [name, setName] = useState(comment.name);
    const [body, setBody] = useState(comment.body)

    async function updateComment() {
        try {
            const response = await fetch(`http://localhost:8080/comments/${comment.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    body: body
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            props.updateArr(comment.id, name, body);

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