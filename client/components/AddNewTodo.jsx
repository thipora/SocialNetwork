import React, { useState, useContext } from 'react'
import TodoObject from '../objects/Todo.js';
import { UserContext } from '../UserProvider';
import "../css/style.css";

function AddNewTodo(props) {
    
    const [newTodo, setNewTodo] = useState('');
    const { userID } = useContext(UserContext);

    async function addNewTodo() {
        let todo = new TodoObject(userID, newTodo)
        fetch(`http://localhost:8080/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        }).then(response => response.json())
        .then(data => {
            todo.id = data.insertId;
            props.addToArr(todo);
        })
        .catch(() => { console.log("adding fail") })
    }

    return (
        <>
            <input type='text' placeholder='the new todo' onChange={(e) => setNewTodo(e.target.value)} required />
            <button type='submit' onClick={addNewTodo}>Add</button>
        </>
    )

}

export default AddNewTodo