import { useEffect, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import CreatePost from './Pages/CreatePost'
import NavBar from './Components/NavBar'
import ReadPosts from './Pages/ReadPosts'
import PostDetails from './Components/PostDetails'
import EditPost from './Pages/EditPost'
import { supabase } from './client'

function App() {
  
  const [posts, setPosts] = useState([]);

  //console.log(posts)
  useEffect(() => {
    const fetchPost = async () => {
      const {data} = await supabase
        .from('ForumPosts')
        .select()
        .order('created_at', { ascending: true})

        setPosts(data);
    }
    fetchPost().catch(console.error)
  })


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path: "/PostDetails/:id",
      element:<PostDetails data={posts}/>
    },
    {
      path:"/PostDetails/:id/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    }
  ]);

  return (
    <div className="container">
      <div className='header'>
        <NavBar />
      </div>
    
        {element}
        
    </div>
  )
}

export default App
