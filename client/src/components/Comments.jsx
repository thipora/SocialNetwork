import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import {
  useLocation
} from "react-router-dom";
import AddNewComment from './AddNewComment';
import "../style.css";



function Comments() {
  const [comments, setComments] = useState([]);
  const data = useLocation();
  const postId = data.state.postId;

  useEffect(() => {
    fetch(`http://localhost:3000/comments?postId=${postId}`)
    .then(response => response.json())
    .then(data => { setComments(data) })
  },
    []);

  function addToArr(comment) {
    setComments((prevComments) => [...prevComments, comment]);
  }

  function deleteFromArr(commentId) {
    const updatedArr = comments.filter(item => item.id !== commentId);
    setComments(updatedArr);
  };

  function updateArr(id, name, body) {
    setComments(comments => comments.map((comment) =>
      (comment.id === id ? { ...comment, body: body, name: name } : comment)
    ));
  }

  return (
    <div>
      <AddNewComment postId={postId} addToArr={addToArr} />
      <ul>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteFromArr={deleteFromArr}
            updateArr={updateArr}
          />
        ))}
      </ul>
    </div>
  );
};

export default Comments;