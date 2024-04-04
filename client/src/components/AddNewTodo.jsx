import React, { useState, useContext } from 'react'
import { Todo } from '../Todo';
import { UserContext } from '../UserProvider';
import "../style.css";

function AddNewTodo(props) {
    
    const [newTodo, setNewTodo] = useState('');
    const { userID } = useContext(UserContext);

    async function addNewTodo() {
        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextTodoId
            });

        let todo = new Todo(userID, id, newTodo)
        fetch(`http://localhost:3000/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        }).then(response => response.json())
        .then(props.addToArr(todo))
        .catch(() => { console.log("adding fail") })
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextTodoId": id + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
    }

    return (
        <>
            <input type='text' placeholder='the new todo' onChange={(e) => setNewTodo(e.target.value)} required />
            <button type='submit' onClick={addNewTodo}>Add</button>
        </>
    )

}

export default AddNewTodo