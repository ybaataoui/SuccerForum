import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav className="navbar header">
            <div className="container-fluid">
                <a className="" style={{ color: 'inherit', textDecoration: 'inherit'}}>Succer Forum</a>
                
                <div>
                    <Link to="/home" style={{ color: 'inherit', textDecoration: 'inherit'}}> Home </Link>&nbsp;&nbsp;
                    <Link to="/new" style={{ color: 'inherit', textDecoration: 'inherit'}}> Create New Post </Link>&nbsp;&nbsp;
                </div>
            </div>
        </nav>     
    )
}

export default NavBar;