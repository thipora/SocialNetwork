import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserProvider';
import "../style.css";
import AddNewAlbum from './AddNewAlbum';


function Albums() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('')
  const [albums, setAlbums] = useState([])
  const { userID } = useContext(UserContext);

  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/albums?userId=${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      })
  }, [])



  function searchAlbum(album) {

    switch (filter) {
      case 'title':
        return (
          album.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
      case 'id':
        return (
          album.id.toString().startsWith(searchTerm)
        );
      case 'all':
        return true;
      default:
        return false;
    }

  };

  function addAlbum(album) {
    setAlbums((prevAlbums) => [...prevAlbums, album]);
  };

  return (
    <>
      <Link to={`/user/${userID}/home`}>Back...</Link>
      <br />
      <h1>Albums</h1>
      <br />
      <AddNewAlbum addAlbum={addAlbum} />
      <br />
      <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="all">All Albums</option>
        <option value="title">Title</option>
        <option value="id">Id</option>
      </select>
      <input type='text' onChange={(e) => setSearchTerm(e.target.value)} />

      <br />
      {
        albums.map((album) => (
          searchAlbum(album) && (
            <Link key={album.key} to={{ pathname: `/user/${userID}/albums/${album.id}` }}>{album.id} - {album.title} <br /></Link>
          )
        ))}
    </>
  );
};

export default Albums;