import React, { useState } from 'react'
import { Todo } from '../Todo';

function AddNewTodo(props){
  

    
    const [newTodo,setNewTodo]=useState('');
    function addNewTodo(){
        let todo=new Todo(props.id,newTodo)
        const urlPost = `https://localhost:8080/todos`;

        fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
          }).then(response => response.json()).catch(()=>{console.log("adding fail")})
    }
      

    return(
        <>
        <input type='text' placeholder='the new todo' onChange={(e) => setNewTodo(e.target.value)}/>
        <button onClick={addNewTodo}>Add</button>
        </>
    )

}

export default AddNewTodo