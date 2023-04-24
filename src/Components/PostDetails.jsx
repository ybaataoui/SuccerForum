import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash} from 'react-icons/fa';
import { supabase } from "../client";


const PostDetails = ({data}) => {
    const {id} = useParams();

    const post = data.find(obj => obj.hasOwnProperty('id') && obj.id == id);

    const [postComment, setPostComment] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPostComment(post.comments);

        if(postComment === null) {
            null
        }else {
            
            const  splitComment = postComment.split(',');
            setPosts(splitComment);
        }

    }, [post])
    

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const {data} = await supabase
    //           .from('Comments')
    //           .select('*, ForumPosts!inner(*)')
    //           .eq('postID', id)
    //           //.order('created_at', { ascending: true})
      
    //           setPostComment(data);
    //           setPosts(postComment);
    //       }
    //       fetchPost().catch(console.error)
    // })

    //console.log(posts)

    //Delete Function
    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
        .from('ForumPosts')
        .delete()
        .eq('id', id);

        window.location = "/";
    }
    //console.log(postComment)

    const currentDate = new Date();
    const createdDate = new Date(post.created_at);

    const updateVote = async (e) => {
        e.preventDefault();

        const newUpvote = post.upvote + 1;

        await supabase
        .from('ForumPosts')
        .update({upvote: newUpvote})
        .eq('id', id)   
    }

    const datePosted = () => {
        const datePInMilliseconds= currentDate.getTime() - createdDate.getTime();
        const diffInHours = datePInMilliseconds / (1000 * 3600)
        return Math.round(diffInHours);
    }

    const createComment = async (e) => {
        //e.preventDefault();

        const comment = document.getElementById('comment').value;
        const updatedComments = post.comments + "," + comment;

        await supabase
        .from('ForumPosts')
        .update({comments: updatedComments})
        .eq('id', id)   

        
        //console.log(updatedComments)
        //location.reload(); 
    }

    
    // const createComment = async (e) => {
    //     //e.preventDefault();

    //     const comment = document.getElementById('comment').value;
    //     //const updatedComments = post.comments + " " + comment;

    //     await supabase
    //     .from('Comments')
    //     .insert({comment: comment, postID: id})
    //     //.eq('id', id)   

    //     //setPostComment([updatedComments]);
    //     //console.log(updatedComments)
    //     //location.reload(); 
    // }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            createComment();
            document.getElementById("comment").value = ""; // Clear the text input
          }
    }

    const handleChange = (event) => {
        setPostComment(event.target.value);
    }

    console.log(posts)
    
    return (
        <div className="card">
            <p>Posted {datePosted()} hours ago</p>
            <h2 className="title">{post.title}</h2>
            <p>{post.content}</p>
            <img src={post.imageURL} alt="" className="postImage"/>

            <div className="d-flex justify-content-between">
                <div className="upVote">
                    <p className="betButton" onClick={updateVote} >👍 </p> &nbsp;&nbsp;
                    <p className="">{post.upvote} &nbsp;upvotes</p>
                </div>
                <div className="action">
                    <Link to={'edit/'+ post.id} style={{ textDecoration: 'inherit'}}><FaEdit size="2rem"/></Link>&nbsp;&nbsp;
                    <span style={{ color: 'red'}} className="trash" onClick={deletePost}><FaTrash size="1.7rem"/></span>     
                </div>  
            </div>
            
            <div className="comments">
                {
                    posts && posts.length > 0 ?
                        posts.map((post) =>
                            <ul className="list-group list-group-flush baground" key={post.id}>
                                <li className="list-group-item list-group-item-secondary" key={post.id}>- {post}</li>
                            </ul>
                        ) : <h2></h2>
                }

                <input className="form-control commentInput" id="comment" type="text" onChange={handleChange} onKeyDown={handleKeyDown}/>
            </div>
        </div>
    )
}

export default PostDetails;