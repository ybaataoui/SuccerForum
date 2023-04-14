import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav class="navbar header">
            <div class="container-fluid">
                <a class="">Succer Forum</a>
                <div class="d-flex rounded">
                    <input class="form-control search" type="text" placeholder="Search" aria-label="Search" />
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