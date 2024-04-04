import { useState, useEffect, useContext } from "react";
import Post from "./Post";
import {
  useNavigate,
  Link
} from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../style.css";
import AddNewPost from "./AddNewPost";


function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('none');
  const { userID } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?userId=${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
  }, [])

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
          post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
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
      <button onClick={() => { setAddPost(true); }}>Add New Post</button>
      {addPost && <AddNewPost addToArr={addToArr} />}
      <br />
      <select value={searchCriteria} onChange={handleSearchChange}>
        <option value="sequential">sequential</option>
        <option value="title">title</option>
        <option value="none">none</option>
      </select>
      <input
        type="text"
        placeholder="search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {posts.map((post) => (searchedPosts(post) &&
        <Post key={post.id} post={post} deletePost={deletePost} updateArr={updateArr} />
      ))}
    </>
  );
};



export default Posts