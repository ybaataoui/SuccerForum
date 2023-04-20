import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav className="navbar header">
            <div className="container-fluid">
                <a className="">Succer Forum</a>
                <div className="d-flex rounded">
                    <input className="form-control search" type="text" placeholder="Search" aria-label="Search" />
                </div>
                <div>
                    <Link to="/"> Home </Link>&nbsp;&nbsp;
                    <Link to="/new"> Create New Post </Link>
                </div>
            </div>
        </nav>     
    )
}

export default NavBar;