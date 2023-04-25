import { useEffect, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Login, SignUp, ReadPosts, CreatePost, EditPost} from './Pages'
import NavBar from './Components/NavBar'
import PostDetails from './Components/PostDetails'
import { supabase } from './client'

function App() {
  
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(false)

  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }
  //console.log(posts)
  // useEffect(() => {
  //   if(sessionStorage.getItem('token')){
  //     let data = JSON.parse(sessionStorage.getItem('token'))
  //     setToken(data)
  //   }
  //   const fetchPost = async () => {
  //     const {data} = await supabase
  //       .from('ForumPosts')
  //       .select()
  //       .order('created_at', { ascending: true})

  //       setPosts(data);
  //   }
  //   fetchPost().catch(console.error)
  // }, [])
  useEffect(() => {
    let isMounted = true; // add a mounted flag to prevent state updates when component is unmounted
  
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  
    const fetchPost = async () => {
      try {
        const { data } = await supabase
          .from('ForumPosts')
          .select()
          .order('created_at', { ascending: true })
  
        if (isMounted) {
          setPosts(data);
        }
      } catch (error) {
        console.error(error);
        // handle error, e.g. show error message to user
      }
    };
  
    fetchPost();
  
    return () => {
      isMounted = false; // set flag to false when component unmounts
    };
  }, []);
  


  // Sets up routes
  let element = useRoutes([
    {
      path: "/home",
      element: token ? <ReadPosts data={posts} token={token}/> : null
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
    },
    {
      path:"/",
      element: <Login setToken={setToken}/>
    },
    {
      path:"/signup",
      element: <SignUp />
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
