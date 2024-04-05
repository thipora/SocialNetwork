import React, { useState, useEffect, useContext } from 'react';
import Comment from './Comment';
import { useLocation, Link } from "react-router-dom";
import { UserContext } from '../UserProvider';
import AddNewComment from './AddNewComment';
import "../css/style.css";



function Comments() {
  const [comments, setComments] = useState([]);
  const data = useLocation();
  const postId = data.state.postId;
  const { userID } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:8080/comments/${postId}`)
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
      <Link to={`/user/${userID}/posts`}>Back...</Link>
      <h1>COMMENTS</h1>
      <br />
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