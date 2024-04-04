import { useEffect, useState} from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Registration from './components/Registration'
import Details from './components/Details';
import Info from './components/Info';
import Todos from './components/Todos';
import Posts from './components/Posts'
import Albums from './components/Albums'
import Album from './components/Album'
import Comments from './components/Comments';
import NotFound from './components/NotFound';


function App() {


  const { id } = useParams();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/user/:userId/home" element={<Home />}/>
          <Route path="/user/:userId/info" element={<Info />} />
          <Route path="/user/:userId/todos" element={<Todos />} />
          <Route path="/user/:userId/posts" element={<Posts />} />
          <Route path="/user/:userId/posts/:commentId/comments" element={<Comments />} />
          <Route path="/user/:userId/albums" element={<Albums />} />
          <Route path="/user/:userId/albums/:albumId" element={<Album/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />}/>
          <Route path="/register/details" element={<Details />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
