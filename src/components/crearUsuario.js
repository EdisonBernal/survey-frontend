import axios from 'axios';
import React, {Fragment, useState} from "react";
import {Button, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
import constantes from '../constantes';

function CrearUsuarios () {

    const history = useHistory();
    const [botonActivo, setBotonActivo] = useState(true);

    const guardarUsuario = (event)=>{
        setBotonActivo(false);
        event.preventDefault();
        const form = event.target;
        
        const data = {
          nombres: form.nombres.value,
          email: form.email.value,
          contrasena: form.contrasena.value}
    
        axios.post(constantes.URL_SERVIDOR +'/usuarios', data)
        .then((response)=>{
          Swal.fire(
            'Guardado',
            `El registro ${data.nombres} ha sido guardado exitosamente`,
            'success'
          )
          history.push('/usuarios')
        })
    }

    return (

    <Fragment>
         <p>CREAR USUARIO</p>
          <div class="border border-3">         
        
          <img 
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card-crearusuario"
          />

            <Form onSubmit={guardarUsuario}> 

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Nombres y Apellidos</Form.Label>
                <Form.Control type="text" name="nombres" required/>            
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" name="email" required/>           
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="contrasena" required/>
              </Form.Group>            
              <Button variant="primary" type="submit" disabled={!botonActivo}>
                Guardar
              </Button>         
            </Form>
          </div>
    </Fragment>  
    );
}

export default CrearUsuarios;