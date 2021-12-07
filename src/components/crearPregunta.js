import axios from 'axios';
import React, {Fragment, useState, useEffect} from "react";
import {Button, Form} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import constantes from '../constantes';

function CrearPreguntas () {
  
  const {getIdSeccion} = useParams();
  const [botonActivo, setBotonActivo] = useState(true);

  function gettipopregunta(){
    return axios.get(constantes.URL_SERVIDOR +'/tipo_pregunta');
  } 
  const [tipopregunta, setTipoPregunta] = useState([]);  

  useEffect(() =>{gettipopregunta().then((response)=>{
    setTipoPregunta(response.data)})
  }, [setTipoPregunta]);

  const guardarPregunta = (event)=>{
    setBotonActivo(false);
    event.preventDefault();
    const form = event.target;
    
    const data = {
      idsec: form.idsec.value,
      idtpreg: form.idtpreg.value,
      pregunta: form.pregunta.value
    }

    axios.post(constantes.URL_SERVIDOR +'/pregunta', data)
    .then((response)=>{
      Swal.fire(
        'Guardado',
        `El registro ${data.pregunta} ha sido guardado exitosamente`,
        'success'
      )
      window.history.back()
      ;})
  }

    return(

    <Fragment>
        <p>CREAR PREGUNTA</p>
        <div className="border border-3">         
          <Form onSubmit={guardarPregunta}> 
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>ID Seccion</Form.Label>
                <Form.Control type="text" name="idsec" value={getIdSeccion} readOnly required/>            
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Tipo Pregunta</Form.Label>
                <Form.Control as="select" aria-label="Default select example" name="idtpreg" required>
                  {tipopregunta.map((pregunta)=>
                  <option key={pregunta.idtpreg} value={pregunta.idtpreg}>
                    {pregunta.tipopregunta}
                  </option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Pregunta</Form.Label>
                <Form.Control type="text" name="pregunta" required/>            
            </Form.Group>                        
              <Button variant="primary" type="submit" disabled={!botonActivo}>
                Guardar
              </Button>
          </Form>
        </div>
    </Fragment>  
    );
}

export default CrearPreguntas;