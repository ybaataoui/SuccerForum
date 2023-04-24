
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const EditPost = ({data}) => {

    const {id} = useParams();

    const [currentPost, setCurrentPost] = useState({title: "", content: "", imageURL: ""});

    useEffect(() => {

        const object = data.find(obj => obj.hasOwnProperty('id') && obj.id == id);

        if (object) {

            setCurrentPost({title: object.title, content: object.content, imageURL: object.imageURL })
        }
        
    }, [id, data])

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (e) => {
        e.preventDefault();

        const newTitle = document.getElementById('title').value;
        const newContent = document.getElementById('content').value;
        const newImageURL = document.getElementById('image').value;

        await supabase
        .from('ForumPosts')
        .update({title: newTitle, content: newContent, imageURL: newImageURL})
        .eq('id', id)

        window.location = "/"    
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

    return (
        <div className="conatiner-fluid" >
            <form action="">
                <div className="d-grid gap-3 mx-auto" style={{width: "700px"}}> 
                    <input  className="form-control" type="text" placeholder="Title" id="title" 
                        defaultValue={currentPost.title} onChange={handleChange}/>
                    <textarea className="form-control" type="textarea" placeholder="Content" rows={7} id="content" 
                        value={currentPost.content} onChange={handleChange}/>
                    <input  className="form-control" type="text" placeholder="Image URL(Optional" id="image" 
                        defaultValue={currentPost.imageURL} onChange={handleChange}/>
                    <div>
                        <button className="btn btn-success " onClick={updatePost}>Update Post</button> 
                        <button className="btn btn-danger" onClick={deletePost}>Delete Post</button> 
                    </div> 
                </div>
            </form>    
        </div>
    )
}

export default EditPost;