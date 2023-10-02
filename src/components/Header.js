import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
// import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Header = (props) => {
    // let location = useLocation();
    const navigate = useNavigate();
    // console.log(">>> check localstorage: ", localStorage)

    const { logout, user } = useContext(UserContext);

    // const [hideHeader, setHideHeader] = useState(false)

    // useEffect(() => {
    //     if (window.location.pathname === "/login") {
    //         setHideHeader(true)
    //     }
    // }, [])

    const handleLogout = () => {
        // localStorage.removeItem("token")
        logout()
        toast.success("Logout succesfully!")
        navigate("/")
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className="navbar-brand">
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        <span> <b>App</b></span>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {user && user.auth === true &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                    {user && user.auth === true && <NavLink to="/users" className="nav-link">Manage Users</NavLink>}
                                </Nav>

                            </>
                        }
                        {user && user.auth === false &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/"><span></span></NavLink>
                                </Nav>

                            </>
                        }
                        <Nav>
                            {user && user.auth === true && user.email &&
                                <span className='nav-link'>Welcome <b>{user.email}</b></span>}
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                {user && user.auth === false && <NavLink to="/login" className="dropdown-item">Login</NavLink>}
                                {user && user.auth === true && <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header