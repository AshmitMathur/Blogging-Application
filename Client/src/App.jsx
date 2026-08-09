import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Listblog from './pages/admin/Listblog'
import Comments from './pages/admin/Comments'
import Addblog from './components/Addblog'
import Login from './pages/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import EditBlog from './pages/admin/EditBlog'
import Register from './pages/users/pages/Register'
import UserLogin from './pages/users/pages/userLogin'
import Profile from "./pages/users/pages/Profile";
import EditProfile from "./pages/users/pages/EditProfile";
import WriteBlog from "./pages/users/pages/WriteBlog";

const App = () => {

  const {token} = useAppContext();
  return (
    <div className='dark:bg-black'> 
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='register' element={<Register/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path='/admin' element={token ? <Layout/> : <Login/>}>
           <Route index element={<Dashboard/>}/>
           <Route path='addblog' element={<Addblog/>}/>
           <Route path='listblog' element={<Listblog/>}/>
           <Route path='comments' element={<Comments/>}/>
           <Route path='editblog/:id' element={<EditBlog/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
