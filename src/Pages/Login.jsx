import { Link } from "react-router-dom";

const Login = () => {

    return (
        <div className="card loginForm">
            <form >
            <div className="mb-3">
                <label for="Email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                
            </div>
            <div class="mb-3">
                <label for="Password" claclassNamess="form-label">Password</label>
                <input type="password" className="form-control" id="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <div>
                <p>You do not have an account <Link to="/signup">Sign Up</Link></p>
            </div>
        </form>  
        </div> 
    )
}

export default Login;