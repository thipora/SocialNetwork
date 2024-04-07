import { React, useState } from "react";
import "../css/style.css";

function UpdateTodo(props) {
    const todo = props.todo
    const [title, setTitle] = useState(todo.title);
    const token = localStorage.getItem("TOKEN");

    async function updateTodo() {
        try {
            const response = await fetch(`http://localhost:8080/todos?id=${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            props.updateArr(todo.id, title);
        } catch (error) {
            alert(error.message);
        }
    }

    return (<>
        <input type='text' placeholder='update todo' value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button type="submit" onClick={updateTodo}>Update</button>
    </>
    )
}

export default UpdateTodo