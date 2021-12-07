import {useEffect, useState} from 'react';
import axios from 'axios';
import React, {Fragment} from "react";
import {Button, Table} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Swal from 'sweetalert2';
import constantes from '../constantes';
import {useHistory, useParams} from 'react-router-dom';

function Secciones () {

  const {getIdEncuesta} = useParams();
  const [secciones, setSecciones] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const history = useHistory();

  
  function getsecciones(){
    return axios.get(constantes.URL_SERVIDOR+'/getSeccionId/'+getIdEncuesta, {
      headers:{
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    });
  }

  const [seccionSeleccionada, setSeccionSeleccionada] = useState({
    idsec: '',
    idenc: '',
    seccion: '',    
  });
  
  const seleccionarSeccion = (dataSecciones) =>{
    setSeccionSeleccionada(dataSecciones);
    setModalEditar(true)
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setSeccionSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))      
  }

  const editar = () => {
      
        axios.put(`${constantes.URL_SERVIDOR+'/seccion'}/${seccionSeleccionada.idsec}`, seccionSeleccionada)
        .then((response)=>{
          Swal.fire(
            'Actualizado',
            `El registro ${seccionSeleccionada.seccion} ha sido actualizado exitosamente`,
            'success'
          )
          setModalEditar(false); 
          getsecciones().then((response)=>{
          setSecciones(response.data)})
        })  
    };

     function eliminarSeccion (idSeccion) {
      axios.delete(constantes.URL_SERVIDOR+'/seccion/'+idSeccion)
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
                  `El registro ${idSeccion} ha sido eliminado exitosamente`,
                  'success'
                );
                setModalEditar(false); 
                getsecciones().then((response)=>{
                setSecciones(response.data)}) 
              } else {
                setModalEditar(false);   
              }
          });
          }
        });
    };

    function listarPreguntas (getIdSeccion) {        
      history.push('secciones/'+getIdSeccion+'/preguntas');
      };
      
    function crearSeccion(getIdEncuesta) {        
      history.push('secciones/'+getIdEncuesta+'/Crear');     
      };
      
      useEffect(() =>{
        getsecciones().then((response)=>{
          setSecciones(response.data)})
       },[setSecciones]);

    return(

      <Fragment>
        <div className="table-general">
          <p>ADMINISTRACION DE SECCIONES</p>
          <Button onClick={() => crearSeccion(getIdEncuesta)}>Nueva Seccion</Button>
            <Table striped bordered hover>
              <thead> 
                <tr>                  
                  <th>Seccion</th>                
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {secciones.map((seccion, key)=>        
                <tr key={seccion.idsec}>                  
                  <td>{seccion.seccion}</td>
                  <td><Button onClick={() => seleccionarSeccion(seccion)} variant="outline-primary">Editar</Button>{"  "}
                  <Button onClick={() => eliminarSeccion(seccion.idsec)} variant="outline-danger">Eliminar</Button>{"  "}
                  <Button onClick={() => listarPreguntas(seccion.idsec)} variant="outline-success">Listar Preguntas</Button></td>                
                </tr>
                )}  
              </tbody>
            </Table>
            <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar Seccion</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
              <label>ID Seccion</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="idsec"
                value={seccionSeleccionada && seccionSeleccionada.idsec}             
              />
              <br />

              <label>ID encuesta</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="idenc"
                value={seccionSeleccionada && seccionSeleccionada.idenc}
                onChange={handleChange}
              />
              <br />

              <label>Seccion</label>
              <input
                className="form-control"
                type="text"
                name="seccion"
                value={seccionSeleccionada && seccionSeleccionada.seccion}
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

export default Secciones;