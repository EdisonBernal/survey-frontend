import axios from 'axios';
import React, {Fragment,useState} from "react";
import {Button, Form} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import constantes from '../constantes';

function CrearSecciones () {

  
  const {getIdEncuesta} = useParams();
  const [botonActivo, setBotonActivo] = useState(true);

  const guardarSeccion = (event)=>{
    setBotonActivo(false);
    event.preventDefault();
    const form = event.target;
    
    const data = {
      idenc: form.idenc.value,
      seccion: form.seccion.value
    }

    axios.post(constantes.URL_SERVIDOR +'/seccion', data)
    .then((response)=>{
      Swal.fire(
        'Guardado',
        `El registro ${data.seccion} ha sido guardado exitosamente`,
        'success'
      )
      window.history.back();}) 
  }

    return(

    <Fragment>
      <p>CREAR SECCION</p>
      <div className="border border-3">
        <Form onSubmit={guardarSeccion}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>ID Encuesta</Form.Label>
            <Form.Control type="text" name="idenc" readOnly value={getIdEncuesta}/>            
          </Form.Group>                                                       
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Seccion</Form.Label>
            <Form.Control type="text" name="seccion" required/>            
          </Form.Group>                        
            <Button variant="primary" type="submit" disabled={!botonActivo}>
              Guardar
            </Button>
        </Form>
      </div>  
    </Fragment>  
    );
}

export default CrearSecciones;