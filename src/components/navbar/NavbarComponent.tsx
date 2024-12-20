import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { useAuthContext } from '../../context/AuthContext';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavbarComponent.css';

const NavbarComponent = ({ isSidebarVisible }) => {
  const cookies = new Cookies();
  const login = cookies.get('isLoggedIn');
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [islogin, setIslogin] = useState(false);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setIslogin(login);
    getUser();
  }, [login]);

  const getUser = async () => {
    const user = cookies.get('user');
    console.log(user.username);
    setUsername(user.username);
    setAddress(user.wallet.address);
  };

  const handleLogout = () => {
    cookies.remove('user');
    cookies.remove('token');
    setIslogin(false);
    setUsername('');
    logout();
    // Redirigir al usuario a la página de inicio o login
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto">Airdrop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {islogin ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/dashboard/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <MetaMaskAvatar address={address} size={40} />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;