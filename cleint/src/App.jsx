import { useEffect, useState} from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Registration from './components/Registration'
import Details from './components/Details';
import Info from './components/Info';
import Todos from './components/Todos';
import Posts from './components/Posts'


function App() {
 
  const { id } = useParams();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home/user/:id" element={<Home />}/>
          {/* <Route index element={<Navigate to={`/home/user/${id}/info`} />} /> */}
          <Route path="/home/user/:id/info" element={<Info />} />
          <Route path="/home/user/:id/todos" element={<Todos />} />
          <Route path="/home/user/:id/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />}/>
          <Route path="/register/details" element={<Details />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
