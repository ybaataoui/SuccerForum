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
                <div class="mb-3">
                    <label for="fullName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="fullName" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label for="Password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" onChange={handleChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Create</button>    
            </form>  
        </div> 
    )
}

export default CreateUser;