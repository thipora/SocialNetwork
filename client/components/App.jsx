import { useEffect, useState} from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Registration from './Registration'
import Details from './Details';
import Info from './Info';
import Todos from './Todos';
import Posts from './Posts';
// import Albums from './components/Albums';
import Comments from './Comments';
import NotFound from './NotFound';


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
          {/* <Route path="/user/:userId/albums" element={<Albums />} />
          <Route path="/user/:userId/albums/:albumId" element={<Album/>} /> */}
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
