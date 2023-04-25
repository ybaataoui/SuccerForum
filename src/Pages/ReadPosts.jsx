// import { useEffect, useState } from "react";
// import Card from "../Components/Card";
// import { Link, useNavigate } from "react-router-dom";

// const ReadPosts = (props) => {

//     const [token, setToken] = useState([])
//     const [data, setData] = useState([])
//     const [isNewestClicked, setIsNewestClicked] = useState(false)
//     const [isPopularClicked, setIsPopularClicked] = useState(false)
//     const [posts, setPosts] = useState(data);

//     const [filteredResults, setFilteredResults] = useState([]);
//     const [searchInput, setSearchInput] = useState("");

//     //update data state when props.data changes
//     useEffect(() => {
//         setData(props.data);
//         setToken(props.token);
//       }, [props.data, props.token]);
    
//       //call handleCases and update posts state when data changes.
//       //Also, note that data is not directly available in the second useEffect because it hasn't been updated yet. 
//       //Instead, you should use the updated value of data by adding it to the dependency array.
//     useEffect(() => {
//         handleCases();
//         setPosts(data);
//     }, [data]);

//     console.log(token)
//     const handleNewestClick = () => {
//         setIsNewestClicked(true);
//         setIsPopularClicked(false);
//     }

//     const handlePopularClick = () => {
//         setIsPopularClicked(true);
//         setIsNewestClicked(false)
        
//     }

//     const newestPosts = () => {
//         const newestData = data.sort((a, b) => {
//             return (new Date(b.created_at) - new Date(a.created_at))
//         });

//         setPosts(newestData);
        
//     }

//     const popularPosts = () => {
//         const popularData = data.sort((a, b) => {
//             return (b.upvote - a.upvote)
//         });

//         setPosts(popularData);
          
//     }

//     const handleCases = async () => {
//         {isNewestClicked 
//             ? (newestPosts())
//             : setPosts(data);}
//         {isPopularClicked == true ? popularPosts() : setPosts(data);}
//     }

//     //Search method to search specific posts.
//     const searchPosts = searchValue => {
//         setSearchInput(searchValue);
//         if (searchValue !== "") {
//           const filteredPosts = posts.filter((post) => 
//             Object.values(post)
//               .join("")
//               .toLowerCase()
//               .includes(searchValue.toLowerCase())
//           )
//           setFilteredResults(filteredPosts);
//         } else {
//           setFilteredResults(Object.keys(posts));
//         }
//       };

//       //logout function
//       let navigate = useNavigate();
//       function handleLogout() {
//         sessionStorage.removeItem('token');
//         navigate('/')
//       }

//     console.log(token)

//     return (
//         <div className="container-fluid">
//             <div className="welcome">
//                 <h4>Welcome {token.user.user_metadata}</h4>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>
//             <br />
//             <div className=" d-flex justify-content-between order">
//                 <div>
//                     <span className="orderspace">Order by: </span> 
//                     <button className="btn btn-info btn-sm" onClick={handleNewestClick} >Newest</button> 
//                     <button className="btn btn-info btn-sm popular" onClick={handlePopularClick} >Most Popular</button>
//                 </div>
//                 <input className="form-control search" type="text" placeholder="Search" aria-label="Search" 
//                     onChange={(inputString) => searchPosts(inputString.target.value)}
//                 />   
//             </div>
//             <div className="container">               
//                 {searchInput.length > 0 
//                     ? filteredResults.map((post) =>
//                     <Link to={`/PostDetails/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={post.id}>
//                         <Card id={post.id} title={post.title}  postedDate={post.created_at} upvote={post.upvote} key={post.id}/>
//                     </Link>   
//                     )
//                     : posts.map((post) => 
//                         <Link to={`/PostDetails/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={post.id}>
//                             <Card id={post.id} title={post.title}  postedDate={post.created_at} upvote={post.upvote} key={post.id}/>
//                         </Link>  
//                     )  
//                 }
//             </div>

//         </div>
//     )
// }

// export default ReadPosts;

import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { Link, useNavigate } from "react-router-dom";

const ReadPosts = (props) => {
  const [token, setToken] = useState({});
  const [data, setData] = useState([]);
  const [isNewestClicked, setIsNewestClicked] = useState(false);
  const [isPopularClicked, setIsPopularClicked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // update data state when props.data changes
  useEffect(() => {
    setData(props.data);
    setToken(props.token);
  }, [props.data, props.token]);

  // call handleCases and update posts state when data changes
  useEffect(() => {
    handleCases();
  }, [data, isNewestClicked, isPopularClicked]);

  const handleNewestClick = () => {
    setIsNewestClicked(true);
    setIsPopularClicked(false);
  };

  const handlePopularClick = () => {
    setIsPopularClicked(true);
    setIsNewestClicked(false);
  };

  const newestPosts = () => {
    const newestData = data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setPosts(newestData);
  };

  const popularPosts = () => {
    const popularData = data.sort((a, b) => {
      return b.upvote - a.upvote;
    });

    setPosts(popularData);
  };

  const handleCases = () => {
    if (isNewestClicked) {
      newestPosts();
    } else if (isPopularClicked) {
      popularPosts();
    } else {
      setPosts(data);
    }
  };
  //console.log(token.user.id)
  // search method to search specific posts
  const searchPosts = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== '') {
      const filteredPosts = posts.filter((post) =>
        Object.values(post)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredPosts);
    } else {
      setFilteredResults([]);
    }
  };

  // logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  function extractNumber(str) {
    return str.substring(3, 8);
  }

  return (
    <div className="container-fluid">
      <div className="welcome d-flex justify-content-between">
        <h4>Personal Member ID: {extractNumber(token.user.id)}</h4>
        <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
      </div>
      <br />
      <div className="d-flex justify-content-between order">
        <div>
          <span className="orderspace">Order by: </span>
          <button
            className="btn btn-info btn-sm"
            onClick={handleNewestClick}
          >
            Newest
          </button>
          <button
            className="btn btn-info btn-sm popular"
            onClick={handlePopularClick}
          >
            Most Popular
          </button>
        </div>
        <input
          className="form-control search"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => searchPosts(e.target.value)}
        />
      </div>
      <div className="container">               
                 {searchInput.length > 0 
                    ? filteredResults.map((post) =>
                    <Link to={`/PostDetails/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={post.id}>
                        <Card id={post.id} title={post.title}  postedDate={post.created_at} upvote={post.upvote} key={post.id}/>
                    </Link>   
                    )
                    : posts.map((post) => 
                        <Link to={`/PostDetails/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={post.id}>
                            <Card id={post.id} title={post.title}  postedDate={post.created_at} upvote={post.upvote} key={post.id}/>
                        </Link>  
                    )  
                }
            </div>

        </div>
    )
}

export default ReadPosts;
