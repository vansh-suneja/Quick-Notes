import React, { useEffect, useState } from 'react'
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

export const Navbar = (props) => {
    // using useLocation hook to set active class
    let location = useLocation();
    useEffect(() => {
        if (localStorage.getItem('token')){
            getUser();
        }
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate();
    const handleLogout = () => {
        // handling logout functionality
        localStorage.removeItem('token');
        setUserInfo({ name: "", email: "" })
        // redirecting the user to login page
        navigate('/login');
        props.displayAlert("Logged Out Successfully","success");
    }
    // creating a use state to display user data
    const [userInfo, setUserInfo] = useState({ name: "", email: "" });
    const getUser = async () => {
        // making an api call to fetch user data
        const userData = await fetch("https://notes-man-backend.vercel.app/api/auth/getuser", {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const jsonData = await userData.json();
        setUserInfo({name:jsonData.name,email:jsonData.email})
    }
    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark">
                <div className="container-fluid">
                    <img className="img-fluid rounded-circle me-2" style={{width:"2rem"}} src="android-chrome-512x512.png" alt="" />
                    <Link className="navbar-brand" to="/">NotesMan</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/dashboard' ? "active" : ""}`} aria-current="page" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                    {/* <div className="btn-group mx-3">
                        <button className={`btn btn-primary dropdown-toggle ${userInfo.name===""?"d-none":""}`} type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                            Profile
                        </button>
                        <ul className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end">
                            <li><span className="dropdown-item">Name : {userInfo.name.toUpperCase()}</span> <hr /> </li>
                            <li><span className="dropdown-item">Email : {userInfo.email}</span></li>
                        </ul>
                    </div> */}
                        {!localStorage.getItem('token') ? <div><Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link></div> : <button className='btn btn-primary mx-2' onClick={handleLogout}>LogOut</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
