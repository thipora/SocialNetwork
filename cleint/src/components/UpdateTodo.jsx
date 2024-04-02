import {React, useState} from "react";


function UpdateTodo(props){

    const [title,setTitle]=useState('');
    function updateTodo(){
        fetch(`http://localhost:8080/todos?id=${props.id}`, {
              method: 'PUT',
         headers: {
        'Content-Type': 'application/json',
         },
        body: JSON.stringify({
            title: title,
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
    }
    return( <>
        <input type='text' placeholder='update todo' onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={updateTodo}>Update</button>
        </>)
}

export default UpdateTodo