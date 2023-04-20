import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash} from 'react-icons/fa';
import { supabase } from "../client";


const PostDetails = ({data}) => {
    const [count, setCount] = useState(0)
    const {id} = useParams();

    let post = data.filter(obj => {
        return obj.hasOwnProperty('id') && obj.id == id;
      });

    const updateCount = () => {
        setCount((count) => count + 1);
    }


    //Delete Function
    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
        .from('ForumPosts')
        .delete()
        .eq('id', id);

        window.location = "/";
    }

    const currentDate = new Date();
    const createdDate = new Date(post[0].created_at);

    const datePosted = () => {
        const datePInMilliseconds= currentDate.getTime() - createdDate.getTime();
        const diffInHours = datePInMilliseconds / (1000 * 3600)
        return Math.round(diffInHours);
    }

    //console.log(post)
    
    return (
        <div className="card">
            <p>Posted {datePosted()} hours ago</p>
            <h2 className="title">{post[0].title}</h2>
            <p>{post[0].content}</p>
            <img src={post[0].imageURL} alt="" className="postImage"/>
            <div className="upVote">
                    <p className="betButton" onClick={updateCount} >👍 </p> &nbsp;&nbsp;
                    <p>{count} &nbsp;upvotes</p>
                    
            </div>
            <div className="action">
                <Link to={'edit/'+ post[0].id} style={{ textDecoration: 'inherit'}}><FaEdit size="2rem"/></Link>&nbsp;&nbsp;
                <span style={{ color: 'red'}} className="trash" onClick={deletePost}><FaTrash size="1.7rem"/></span>     
            </div>
        </div>
    )
}

export default PostDetails;