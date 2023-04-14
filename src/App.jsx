import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import CreatePost from './Pages/CreatePost'
import NavBar from './Components/NavBar'

function App() {
  const [count, setCount] = useState(0)


  // Sets up routes
  let element = useRoutes([
    // {
    //   path: "/",
    //   element:<ReadPosts data={posts}/>
    // },
    // {
    //   path:"/edit/:id",
    //   element: <EditPost data={posts} />
    // },
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
