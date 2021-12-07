import {useEffect, useState} from 'react';
import axios from 'axios';
import React, {Fragment} from "react";
import {Button, Table} from 'react-bootstrap'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import constantes from '../constantes';
import {useHistory, useParams} from 'react-router-dom';

function Preguntas () {

  const history = useHistory();
  const {getIdSeccion} = useParams();


  function getpreguntas(){
    return axios.get(constantes.URL_SERVIDOR +'/pregunta/'+getIdSeccion, {
      headers:{
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    });
  }
  const [preguntas, setPreguntas] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);


  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState({
    idpreg: '',
    idsec: '',
    idtpreg: '',
    pregunta: '',
  });
  
  const seleccionarPregunta = (dataPreguntas) =>{
    setPreguntaSeleccionada(dataPreguntas);
    setModalEditar(true)
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setPreguntaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))      
  }

  const editar = () => {
    
      
        axios.put(`${constantes.URL_SERVIDOR +'/pregunta'}/${preguntaSeleccionada.idpreg}`, preguntaSeleccionada)
        .then((response)=>{
          Swal.fire(
            'Actualizado',
            `El registro ${preguntaSeleccionada.pregunta} ha sido actualizado exitosamente`,
            'success'
          )
          setModalEditar(false);
          getpreguntas().then((response)=>{
          setPreguntas(response.data)})
        })
    };

    useEffect(() =>{
      getpreguntas().then((response)=>{
        setPreguntas(response.data)})    
     }, [setPreguntas] );

     function eliminarPregunta (idPregunta) {
      axios.delete(constantes.URL_SERVIDOR +'/pregunta/'+idPregunta)
        .then(response => {
          
          if(response.data != null) {
            Swal.fire({
              title: "Eliminar",
              text: "¿Realmente desea Eliminar el registro?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Sí, eliminar",
              cancelButtonText: "Cancelar",
          })
          .then(resultado => {
              if (resultado.value) {
                Swal.fire(
                  'Eliminado',
                  `El registro ${idPregunta} ha sido eliminado exitosamente`,
                  'success'
                );
                setModalEditar(false); 
                getpreguntas().then((response)=>{
                setPreguntas(response.data)}) 
              } else {
                setModalEditar(false);   
              }
          });
          }
        });
    };

    function crearPregunta(getIdSeccion) {        
      history.push('preguntas/'+getIdSeccion+'/Crear');   
    };

    return(

      <Fragment>
        <div className="table-general">
          <p>ADMINISTRACION DE PREGUNTAS</p>
            <Button onClick={() => crearPregunta(getIdSeccion)}>Nueva Pregunta</Button>
            <Table striped bordered hover>
              <thead> 
                <tr>                                  
                  <th>Pregunta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {preguntas.map((pregunta, key)=>        
                <tr key={pregunta.idpreg}>                  
                  <td>{pregunta.pregunta}</td>
                  <td><Button onClick={() => seleccionarPregunta(pregunta)} variant="outline-primary">Editar</Button>{"  "}
                  <Button onClick={() => eliminarPregunta(pregunta.idpreg)} variant="outline-danger">Eliminar</Button></td>
                </tr>
                )}  
              </tbody>
            </Table>
            <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar Pregunta</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
              <label>ID Pregunta</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="idpreg"
                value={preguntaSeleccionada && preguntaSeleccionada.idpreg}             
              />
              <br />

              <label>ID Seccion</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="idsec"
                value={preguntaSeleccionada && preguntaSeleccionada.idsec}
                onChange={handleChange}
              />
              <br />

              <label>ID tipo de pregunta</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="idtpreg"
                value={preguntaSeleccionada && preguntaSeleccionada.idtpreg}
                onChange={handleChange}
              />
              <br />

              <label>Pregunta</label>
              <input
                className="form-control"
                type="text"
                name="pregunta"
                value={preguntaSeleccionada && preguntaSeleccionada.pregunta}
                onChange={handleChange}
              />
              <br />
              
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>editar()}>
              Actualizar
            </button>
            <button className="btn btn-danger" onClick={()=>setModalEditar(false)}>
              Cancelar
            </button>
          </ModalFooter>
          </Modal>
      </div>      
      </Fragment>  
    );
}

export default Preguntas;