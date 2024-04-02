import React from "react";

function Todo(props){

    let todo=props.todo;

    function deleteTodo(){
        const urlDelete = `https://localhost:8080/todos?id=${todo.id}`;
  
        fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        }).then(response => response.json()).then(props.deleteFromArr(todo.id))
        .catch(()=>console.log("delete fail"));
  
      }
  
      function updateStatusTodo(){
        fetch(`http://localhost:8080/todos?id=${todo.id}`, {
                method: 'PUT',
           headers: {
          'Content-Type': 'application/json',
           },
          body: JSON.stringify({
              completed: todo.completed,
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
    return(
        <>
        <p>id:{todo.id} title:{todo.title}</p>
        <input type='checkbox' checked={todo.completed} onChange={()=>{todo.completed=checked}}>Completed?</input>
        <button onClick={deleteTodo}>Delete</button>
        <button onClick={updateStatusTodo}>Update Status</button>
        <button onClick={<UpdateTodo id={todo.id}/>}>Update</button>
        </>
       
    )
}

export default Todo