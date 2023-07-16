import  { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter,Routes,Route ,Navigate, useNavigate} from 'react-router-dom';
import Home from './components/Home/home.js';
import Auth from "./components/Auth/Auth.js";

import PostDetails from './components/PostDetail/postDetail.jsx';
const App = () => {

 
  const ProtectedRoute=({children})=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);
  if(user == null){
   return <Navigate to="/auth"/>
  }
  return children;
  }
  
    return (
        <Container maxWidth="lg" sx={{backgroundColor:"blue"}}>
          <BrowserRouter>
          <Navbar/>
          <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts"  element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/posts/search"  element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/posts/:id"  element={<ProtectedRoute><PostDetails/></ProtectedRoute>} />
          <Route path="/auth" element={<Auth/> } />
          </Routes>
          </BrowserRouter>
    </Container>
    );
}

export default App;
