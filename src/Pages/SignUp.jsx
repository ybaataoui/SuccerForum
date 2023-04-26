import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const CreateUser = () => {

    const [formData, setFormData] = useState({
        fullName: '', email:'', password:''
    })

    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }
    console.log(formData)

    const handleSubmit = async (e) => {  
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp(
                {
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                    first_name: formData.fullName,
                    }
                }
                }
            )

            alert('Check your email for verification link!')
        } catch (error) {
           alert(error) 
        }
  
    }
    

    return (
        <div className="card loginForm">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullName" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>    
            </form>  
        </div> 
    )
}

export default CreateUser;