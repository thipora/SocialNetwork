import { useState, useEffect, useContext } from "react";
import Post from "./Post.jsx";
import { Link } from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../css/style.css";
import AddNewPost from "./AddNewPost";


function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('none');
  const { userID } = useContext(UserContext);
  const token = localStorage.getItem('TOKEN');
  
    useEffect(() => {
      fetch(`http://localhost:8080/posts?userId=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => alert(error.message));
    }, []);
  

  const handleSearchChange = (event) => {
    setSearchCriteria(event.target.value);
  };
  function deletePost(id) {
    setPosts(posts.filter(item => item.id !== id))
  }
  function addToArr(post) {
    setPosts((prevPosts) => [...prevPosts, post]);
    setAddPost(false)
  }

  function updateArr(id, title, body) {
    setPosts(posts => posts.map((post) =>
      (post.id === id ? { ...post, body: body, title: title } : post)
    ));
  }

  function searchedPosts(post) {
    switch (searchCriteria) {
      case 'sequential':
        return (
          post.id.toString().includes(searchTerm)
        );
      case 'title':
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'none':
        return true;
      default:
        return false;
    }

  }
  return (
    <>
      <Link to={`/user/${userID}/home`}>Back...</Link>
      <h1>POSTS</h1>
      <br />
      <button onClick={() => { setAddPost(!addPost); }}>Add New Post</button>
      {addPost && <AddNewPost addToArr={addToArr} />}
      <br />
      <select value={searchCriteria} onChange={handleSearchChange}>
        <option value="sequential">sequential</option>
        <option value="title">title</option>
        <option value="none">none</option>
      </select>
      {searchCriteria !== 'none' && (
        <input
          type="text"
          placeholder="search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      {posts.map((post) => (searchedPosts(post) &&
        <Post key={post.id} post={post} deletePost={deletePost} updateArr={updateArr} />
      ))}
    </>
  );
};



export default Posts