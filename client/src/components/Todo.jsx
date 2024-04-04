import React, { useState } from "react";
import UpdateTodo from "./UpdateTodo";
import "../style.css";

function Todo(props) {
    let todo = props.todo;
    const [updateTodo, setUpdateTodo] = useState(false);
    const [completed, setCompleted] = useState(todo.completed);

    function deleteTodo() {
        try {
            fetch(`http://localhost:3000/todos/${todo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                response.json();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            props.deleteFromArr(todo.id);
        }
        catch (error) {
            console.log(error)
        }
    }

    function updateStatusTodo() {
        fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: !completed,
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
        setCompleted(!completed);
    }
    return (
        <>
            <p><input type="checkbox" onChange={updateStatusTodo} checked={completed} />  id:{todo.id} title:{todo.title}</p>
            <button onClick={deleteTodo}>Delete</button>
            <button onClick={() => { setUpdateTodo(!updateTodo) }}>Update</button>
            {updateTodo && <UpdateTodo todo={todo} updateArr={props.updateArr} />}
            <p>------------------------------</p>
        </>

    )
}

export default Todo