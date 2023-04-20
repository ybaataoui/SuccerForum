import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(props.data)
    }, [props])

    //console.log(posts[0].created_at)
    return (
        <div className="container-fluid">
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => 
                    <Link to={`/PostDetails/${post.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Card id={post.id} title={post.title} content={post.content} imageURL={post.imageURL} postedDate={post.created_at}/>
                    </Link>    
                )
                : <h2>{'No Posts Yet 😞'}</h2>
            }


        </div>
    )
}

export default ReadPosts;