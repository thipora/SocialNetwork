import React from 'react';

function Comment(props)  {
  const comment=props.comment

  
  return (
    <li key={comment.id}>
      {comment.name}: {comment.text}
      {props.email === comment.email && (
        <>
          <button onClick={() => handleUpdateComment(comment.id)}>עדכן</button>
          <button onClick={() => handleDeleteComment(comment.id)}>מחק</button>
        </>
      )}
    </li>
  );
};

export default Comment;