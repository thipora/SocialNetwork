import React, { useState, useContext } from 'react'
import TodoObject from '../objects/Todo.js';
import { UserContext } from '../UserProvider';
import "../css/style.css";

function AddNewTodo(props) {
    
    const [newTodo, setNewTodo] = useState('');
    const { userID } = useContext(UserContext);
    const token = localStorage.getItem("TOKEN");

    async function addNewTodo() {
        let todo = new TodoObject(userID, newTodo)
        await fetch(`http://localhost:8080/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(todo),
        }).then(response => {
            console.log(response);
            if(!response.ok)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            todo.id = data.insertId;
            props.addToArr(todo);
        })
        .catch(error => alert(error.message))
    }

    return (
        <>
            <input type='text' placeholder='the new todo' onChange={(e) => setNewTodo(e.target.value)} required />
            <button type='submit' onClick={addNewTodo}>Add</button>
        </>
    )

}

export default AddNewTodo