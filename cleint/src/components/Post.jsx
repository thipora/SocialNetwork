import React, { useState } from 'react';


function Post(props) {
   const post=props.post;
  const [isExpanded, setIsExpanded] = useState(false);

  const style={

  }
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

 

  function deletePost(){
    const urlDelete = `https://localhost:8080/todos?id=${post.id}`;
  
    fetch(urlDelete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    }).then(response => response.json())
    .catch(()=>console.log("delete fail"));
  }

  return (
    <div>
      <p>{post.id} - {post.title}</p>
      <button onClick={handleExpand}>Expand</button>
      <button onClick={deletePost}>Delete</button>
      <button onClick={()=>{<UpdatePost post={post}/>}}>Update</button>
      

      {isExpanded && (
        <div>
          <p>{post.content}</p>
          <button onClick={()=>{<Comments postId={post.id} activeUser={activeUser} />}}>Comments</button>
        </div>
      )}
    </div>
  );
};

export default Post
