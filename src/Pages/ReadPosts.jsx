import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const ReadPosts = (props) => {

    //const [posts, setPosts] = useState([])
    const [data, setData] = useState([])
    const [isNewestClicked, setIsNewestClicked] = useState(false)
    const [isPopularClicked, setIsPopularClicked] = useState(false)
    const [posts, setPosts] = useState(data);

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setData(props.data)
        handleCases();
        setPosts(data)
    }, [props])

    const handleNewestClick = () => {
        setIsNewestClicked(true);
        setIsPopularClicked(false);
    }

    const handlePopularClick = () => {
        setIsPopularClicked(true);
        setIsNewestClicked(false)
        
    }

    const newestPosts = () => {
        const newestData = data.sort((a, b) => {
            return (new Date(b.created_at) - new Date(a.created_at))
        });

        setPosts(newestData);
        
    }

    const popularPosts = () => {
        const popularData = data.sort((a, b) => {
            return (b.upvote - a.upvote)
        });

        setPosts(popularData);
          
    }

    const handleCases = async () => {
        {isNewestClicked 
            ? (newestPosts())
            : setPosts(data);}
        {isPopularClicked == true ? popularPosts() : setPosts(data);}
    }

    //Search method to search specific posts.
    const searchPosts = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
          const filteredPosts = posts.filter((post) => 
            Object.values(post)
              .join("")
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          setFilteredResults(filteredPosts);
        } else {
          setFilteredResults(Object.keys(posts));
        }
      };

    //console.log(posts)

    return (
        <div className="container-fluid">
            <div className=" d-flex justify-content-between order">
                    <div>
                        <span className="orderspace">Order by: </span> 
                        <button className="btn btn-info btn-sm" onClick={handleNewestClick} >Newest</button> 
                        <button className="btn btn-info btn-sm popular" onClick={handlePopularClick} >Most Popular</button>
                    </div>
                    <input className="form-control search" type="text" placeholder="Search" aria-label="Search" 
                        onChange={(inputString) => searchPosts(inputString.target.value)}
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

                {/* {
                    posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Link to={`/PostDetails/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <Card id={post.id} title={post.title}  postedDate={post.created_at} upvote={post.upvote} key={post.id}/>
                        </Link>    
                    )
                    : <h2>{'No Posts Yet 😞'}</h2>
                } */}
            </div>

        </div>
    )
}

export default ReadPosts;