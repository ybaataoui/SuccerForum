import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const Login = ({setToken}) => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:'', password:''
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
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
                })
            
                console.log(setToken)
            if(error) throw error
            console.log(data)
            setToken(data)
            navigate('/home')
            
        } catch (error) {
           alert(error) 
        }
  
    }
    
    return (
        <div className="card loginForm">
            <form >
            <div class="mb-3">
                <label for="Email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="Email" aria-describedby="emailHelp"/>
                
            </div>
            <div class="mb-3">
                <label for="Password" class="form-label">Password</label>
                <input type="password" class="form-control" id="Password" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div>
                <p>You do not have an account <Link to="/signup">Sign Up</Link></p>
            </div>
        </form>  
        </div> 
    )
}

export default Login;