import React from "react";
import Post from "./Post";
import AddNewPost from './AddNewPost'

function Posts(){
  
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(''); 
  const id=location.state.id;

  function fetchArr(){
    fetch(`localhost8080/posts?userId=${id}`)
      .then(response => response.json())
      .then(data=>setPosts(data))
    }
    
    useEffect(()=>{fetchArr()},[]);

    const handleSearchChange = (event) => {
        setSearchCriteria(event.target.value);
  
      };

  function filteredPosts(post){
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
     <select value={searchCriteria} onChange={handleSearchChange}>
        <option value="sequential">sequential</option>
        <option value="title">title</option>
        <option value="none">none</option>
      </select>


    <div>
      <input
        type="text"
        placeholder="search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {posts.map(post => {filteredPosts(post)?(
        <Post key={post.id} post={post} activeUser={activeUser} />
      ):""})}
    </div>

    <button onClick={<AddNewPost id={id}/>}>Add New Post</button>
    </>
  );
};



export default Posts