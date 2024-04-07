import React, { useState } from 'react';
import UpdateComment from './UpdateComment';
import "../css/style.css";

function Comment(props) {
  const [toUpdate, setToUpdate] = useState(false)
  const comment = props.comment
  const email = JSON.parse(localStorage.getItem("currentUser")).email
  const token = localStorage.getItem("TOKEN");

  function deleteComment() {
   try{
    fetch(`http://localhost:8080/comments?id=${comment.id}`, {
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
    props.deleteFromArr(comment.id);
   }
   catch(error){
    alert(error.message)
  }
}

  return (
    <li key={comment.id}>
      {comment.name}: {comment.body}
      {email === comment.email && (
        <>
          <button onClick={() => { setToUpdate(!toUpdate) }}>to update</button>
          <button onClick={() => deleteComment(comment.id)}>delete</button>
          {toUpdate && <UpdateComment updateArr={props.updateArr} comment={comment} />}
        </>
      )}
    </li>
  );
};

export default Comment;