import React, { useState, useContext } from "react";
import UpdateTodo from "./UpdateTodo";
import { UserContext } from '../UserProvider';
import "../css/style.css";

function Todo(props) {
    let todo = props.todo;
    const [updateTodo, setUpdateTodo] = useState(false);
    const [completed, setCompleted] = useState(todo.completed);
    const { userID } = useContext(UserContext);
    const token = localStorage.getItem("TOKEN");

    function deleteTodo() {
        try {
            fetch(`http://localhost:8080/todos?id=${todo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);  
                }
                return response.json();
            })
            props.deleteFromArr(todo.id);
        }
        catch (error) {
            alert(error.message)
        }
    }

    function updateStatusTodo() {
        fetch(`http://localhost:8080/todos?id=${todo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
            { (todo.userId==userID)&&
                <>
                <button onClick={deleteTodo}>Delete</button>
                <button onClick={() => { setUpdateTodo(!updateTodo) }}>to update</button>
                {updateTodo && <UpdateTodo todo={todo} updateArr={props.updateArr} />}
                </>
            }
            <p>------------------------------</p>
        </>

    )
}

export default Todo