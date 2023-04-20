
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const EditPost = ({data}) => {
    const [post, setPost] = useState({title: "", content: "", imageURL: ""});
    const {id} = useParams();
    const [postByID, setPostById] = useState([])

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const [newTitle, setTitle] = useState(post.title) 
    const [newContent, setContent] = useState("")
    const [newImageURL, setImage] = useState("")

    useEffect(() => {
        //select only the post that matches the id
        let object = data.filter(obj => {
            return obj.hasOwnProperty('id') && obj.id == id;
        });
        setPostById(object[0]) //set the post
        setTitle(postByID.title)
        setContent(postByID.content)
        setImage(postByID.imageURL)
    }, [])

    
    
    console.log(postByID)
    const updatePost = async (e) => {
        e.preventDefault();

        await supabase
        .from('ForumPosts')
        .update({title: post.title, content: post.content, imageURL: post.imageURL})
        .eq('id', id)

        window.location = "/"    
    }
   
    //Delete Function
    const deletePlayer = async (event) => {
        event.preventDefault();
        await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

        window.location = "/";
    }

    return (
        <div className="conatiner-fluid" >
            <form action="">
                <div className="d-grid gap-3 mx-auto" style={{width: "700px"}}> 
                    <input  className="form-control" type="text" placeholder="Title" id="title" 
                        value={newTitle} onChange={handleChange}/>
                    <textarea className="form-control" type="textarea" placeholder="Content" rows={7} id="content" 
                        value={newContent} onChange={handleChange}/>
                    <input  className="form-control" type="text" placeholder="Image URL(Optional" id="image" 
                        value={newImageURL} onChange={handleChange}/>
                    <button className="btn btn-success" onClick={updatePost}>Update Post</button>  
                </div>
            </form>    
        </div>
    )
}

export default EditPost;