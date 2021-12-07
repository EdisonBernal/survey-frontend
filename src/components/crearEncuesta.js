import axios from 'axios';
import React, {Fragment, useState} from "react";
import {Button, Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
import constantes from '../constantes';

function CrearEncuestas () {

  const history = useHistory();
  const [botonActivo, setBotonActivo] = useState(true);

  const guardarEncuesta = (event)=>{
    setBotonActivo(false);
    event.preventDefault();
    const form = event.target;
    
      const data = {
        
        titulo: form.titulo.value,
        descripcion: form.descripcion.value,
        imagen: form.imagen.value
      }

      axios.post(constantes.URL_SERVIDOR +'/encuesta', data,{
        headers:{
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      .then((response)=>{
        Swal.fire(
          'Guardado',
          `El registro ${data.titulo} ha sido guardado exitosamente`,
          'success'
        )        
        history.push('/encuestas');})
      }

    return (

    <Fragment>
        <p>CREAR ENCUESTA </p>
        <div class="border border-3">
          <Form onSubmit={guardarEncuesta}>
            {/* <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>ID usuario</Form.Label>
             <Form.Control type="text" name="idusu" readOnly value={}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Título de la Encuesta</Form.Label>
              <Form.Control type="text" name="titulo" required/>         
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripción de la Encuesta</Form.Label>
              <Form.Control as="textarea" rows={3} type="text" name="descripcion" required/>         
            </Form.Group>            
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control className="form-control" type="file" name="imagen"/>
            </Form.Group>                          
            <Button variant="primary" type="submit" disabled={!botonActivo}>
              Guardar
            </Button>                      
          </Form>
        </div> 
    </Fragment>  
    );
}

export default CrearEncuestas;