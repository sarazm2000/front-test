import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <Link to="/profile" className="nav-link nav-item profile">Profile</Link>
                <Link to="/add-post" className="nav-link nav-item">Add Post</Link>
                <Link to="/timeline" className="nav-link nav-item">Timeline</Link>
            </nav>
        </div>
    )
}

export default Navbar;