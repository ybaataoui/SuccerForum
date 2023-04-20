
import { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState([]);
    //console.log(post)
    const creatPost = async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imageURL = document.getElementById('image').value;

        const post = {
            title : title,
            content: content,
            imageURL: imageURL
        }
        setPost(post);

        const {data, error} = await supabase
        .from('ForumPosts')
        .insert(post)
        .select();

        //console.log(data)
        window.location = "/"
        
    }

    return (
        <div className="conatiner-fluid" >
            <form action="" onSubmit={creatPost}>
                <div className="d-grid gap-3 mx-auto" style={{width: "700px"}}> 
                    <input  className="form-control" type="text" placeholder="Title" id="title"/>
                    <textarea className="form-control" type="textarea" placeholder="Content" rows={7} id="content"/>
                    <input  className="form-control" type="text" placeholder="Image URL(Optional" id="image"/>
                    <button className="btn btn-success" onClick={creatPost}>Create Post</button>   
                </div>
            </form>    
        </div>
    )
}

export default CreatePost;