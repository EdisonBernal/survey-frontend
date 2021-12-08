import {useEffect, useState} from 'react';
import axios from 'axios';
import React, {Fragment} from "react";
import {Button, Table} from 'react-bootstrap'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import constantes from '../constantes';
import Image from 'react-bootstrap/Image'

function Encuestas () {
  const history = useHistory();

  if(constantes.isUser == null){
    history.push('/login')
      
  }

  function getencuestas(){
    return axios.get(constantes.URL_SERVIDOR +'/encuesta', {
      headers:{
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    });
  }

    const [encuestas, setEncuestas] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    

    const [encuestaSeleccionada, setEncuestaSeleccionada] = useState({
      idenc: '',
      titulo: '',
      descripcion: '',
      imagen: ''
    });
    
    const seleccionarEncuesta = (dataEncuestas) =>{
      setEncuestaSeleccionada(dataEncuestas);
      setModalEditar(true)
    }

    const handleChange = e => {
      const {name, value} = e.target;
      setEncuestaSeleccionada((prevState)=>({
        ...prevState,
        [name]: value
      }))      
    }

    const editar = () => {
     
          axios.put(`${constantes.URL_SERVIDOR +'/encuesta'}/${encuestaSeleccionada.idenc}`, encuestaSeleccionada)
          .then((response)=>{

            Swal.fire(
              'Actualizado',
              `El registro ${encuestaSeleccionada.titulo} ha sido actualizado exitosamente`,
              'success'
            )
            setModalEditar(false); 
            getencuestas().then((response)=>{
            setEncuestas(response.data)})            
          })                  
      };


    useEffect(() =>{
        getencuestas().then((response)=>{
          setEncuestas(response.data)})
     }, [setEncuestas]);

     function eliminarEncuesta (idEncuesta) {
      axios.delete(constantes.URL_SERVIDOR +'/encuesta/'+idEncuesta)
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
                    `El registro ${idEncuesta} ha sido eliminado exitosamente`,
                    'success'
                  );
                  setModalEditar(false); 
                  getencuestas().then((response)=>{
                  setEncuestas(response.data)}) 
                } else {
                  setModalEditar(false);   
                }
            });
          }
        });
      };

      function listarSecciones (key) {        
        history.push('encuestas/'+key+'/secciones');
      };

      function crearEncuesta(){
        history.push('encuestas/Crear');
    }
    
    
    return( 
         
    <Fragment>      
      <div className="table-general">
        <p>ADMINISTRACION DE ENCUESTAS</p>
        <Button onClick={() => crearEncuesta()}>Nueva Encuesta</Button>
        <Table striped bordered hover>
            <thead> 
              <tr>                
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {encuestas.map((encuesta, key)=>        
              <tr key={encuesta.idenc}>                
                <td>{encuesta.titulo}</td>
                <td>{encuesta.descripcion}</td>                
                <td><Image src={encuesta.imagen} bsPrefix width="100px" height="100px" /></td>
                <td align="center"><Button variant="outline-primary" onClick={() => seleccionarEncuesta(encuesta)}>Editar</Button>{"  "}
                <Button onClick={() => eliminarEncuesta(encuesta.idenc)} variant="outline-danger">Eliminar</Button>{"  "}
                <Button onClick={() => listarSecciones(encuesta.idenc)} variant="outline-success">Listar Secciones</Button></td>
                
              </tr>
              )}  
            </tbody>
          </Table>

          <Modal isOpen={modalEditar}>
          <ModalHeader>
          <div>
            <h3>Editar Encuesta</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="idenc"
              value={encuestaSeleccionada && encuestaSeleccionada.idenc}             
            />
            <br />

            <label>Titulo</label>
            <input
              className="form-control"
              type="text"
              name="titulo"
              value={encuestaSeleccionada && encuestaSeleccionada.titulo}
              onChange={handleChange}
            />
            <br />

            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={encuestaSeleccionada && encuestaSeleccionada.descripcion}
              onChange={handleChange}
            />
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="imagen"
              value={encuestaSeleccionada && encuestaSeleccionada.imagen}
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

export default Encuestas;