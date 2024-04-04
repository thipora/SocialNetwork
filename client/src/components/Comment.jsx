import React, { useState } from 'react';
import UpdateComment from './UpdateComment';
import "../style.css";

function Comment(props) {
  const [toUpdate, setToUpdate] = useState(false)
  const comment = props.comment
  const email = JSON.parse(localStorage.getItem("currentUser")).email

  function deleteComment() {
   try{
    fetch(`http://localhost:3000/comments?id=${comment.id}`, {
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
    props.deleteFromArr(comment.id);
   }
   catch(error){
    console.log(error)
   }

  }

  return (
    <li key={comment.id}>
      {comment.name}: {comment.body}
      {email === comment.email && (
        <>
          <button onClick={() => { setToUpdate(!toUpdate) }}>update</button>
          <button onClick={() => deleteComment(comment.id)}>delete</button>
          {toUpdate && <UpdateComment updateArr={props.updateArr} comment={comment} />}
        </>
      )}
    </li>
  );
};

export default Comment;