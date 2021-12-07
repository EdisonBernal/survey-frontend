import axios from "axios";
import React, {useState} from "react";
import {Form} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import constantes from '../constantes';
import Swal from 'sweetalert2'

function Login ()  {

 
    const [botonActivo, setBotonActivo] = useState(true); 
    const history = useHistory();

    const login = (event) => {
        setBotonActivo(false);    
        event.preventDefault();

        const form = event.target;
        const data = {
            email: form.email.value,
            password: form.password.value,
        };

        axios.post(constantes.URL_SERVIDOR +'/login', data)
            .then((response) => {
              if(response.data.token != null){
                Swal.fire({                  
                  icon: 'success',
                  title: 'Bienvenido!',
                  showConfirmButton: false,
                  timer: 1500
                })
                localStorage.setItem('token', response.data.token)                
                history.push('/usuarios')
                setTimeout(() => {window.location.reload()}, 1500);             
                                             
              } else
              {
                Swal.fire(
                {
                  icon: 'Error',
                  title: 'Oops...',
                  text: 'Datos de acceso inválidos!',
                  footer: '<a href="/usuarios/Crear">Deseas registrate?</a>'                  
                })                
                setBotonActivo(true);
              }
          }
        );        
    }  
      
      return (
        
        <div className="col-md-12">
        <div className="card card-container">
        <img 
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="email">Email</label>            
            <input
              type="email"
              className="form-control"
              name="email"
              required             
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password" 
              required            
            />
          </div>

          <div className="form-group div-login">
            <div className="form-group">
                <button  type="submit" className="btn btn-primary btn-block" disabled={!botonActivo}>            
                <span>Ingresar</span>                
                </button>
                <div className="link-form">
                <Link className="nav-link" to='/usuarios/Crear'>Registrarme</Link>                
                </div>
            </div>            
            </div>          
        </Form>
      </div>
    </div>
        
    );
}

export default Login;