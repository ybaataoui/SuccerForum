import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const CreateUser = () => {

    const [formData, setFormData] = useState({
        fullName: '', email:'', password:''
    })

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }
    console.log(formData)

     async function handleSubmit (e) {  
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    }
                }
                }
            )

            alert('Check your email for verification link!')
            alert('Your account is created successfully!')
        } catch (error) {
           alert(error) 
        }

        window.location = '/login';
  
    }
    

    return (
        <div className="card loginForm">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="fullName" class="form-label">Full Name</label>
                    <input type="text" className="form-control" name="fullName" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange}/>
                </div>
                <div class="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>    
            </form>  
        </div> 
    )
}

export default CreateUser;