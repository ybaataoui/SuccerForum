import { Link } from "react-router-dom";

const Login = () => {

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