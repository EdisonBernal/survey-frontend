import logo from './encuesta.png';
import logout from './logout.png';
import React from "react";
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import constantes from '../constantes';

function Header () {   
    

    let menu = '';

     if(constantes.isUser) {      
      const cerrarSesion = () => {
        localStorage.removeItem('token');        
        window.location.reload(true);      
    }
       menu = <>
        <Nav className="me-auto">
        <NavDropdown  title="USUARIO" id="collasible-nav-dropdown">        
        <NavDropdown.Item href="/usuarios">Mi perfil</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/encuestas">ENCUESTAS</Nav.Link>                     
        </Nav>        
        <div className='logout'>        
        <a href="/">
        <img src={logout} width="40px" height="40px" alt="Cerrar sesión" onClick={cerrarSesion} />
        </a>        
        </div>
        </>
     }
     
    return(      
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
        <Navbar.Brand>
          <a href="/">
          <img src={logo} width="35px" height="35px" alt="Inicio" />          
          </a>
          Encuestas
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
        {menu}
        </Navbar.Collapse>
        </Container>   
       </Navbar>            
    );
}
export default Header;