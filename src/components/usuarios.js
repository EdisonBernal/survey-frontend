import {useEffect, useState} from 'react';
import axios from 'axios';
import React, {Fragment} from "react";
import {Button, Table} from 'react-bootstrap'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import constantes from '../constantes';
import { Link } from 'react-router-dom';

function Usuarios () {

    function getusuarios () {
        return axios.get(constantes.URL_SERVIDOR +'/usuarios', {
          headers:{
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
    }          

    const [usuarios, setUsuarios] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
      idusu: '',
      nombre: '',
      email: '',
      contrasena: ''
    });
    
    const seleccionarUsuario = (dataUsuarios) =>{
      setUsuarioSeleccionado(dataUsuarios);
      setModalEditar(true)
    }

    const handleChange = e => {
      const {name, value} = e.target;
      setUsuarioSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))      
    }

    const editar = () => {
      var nuevaData = usuarios;
      nuevaData.forEach(usuario=>{
        if(usuario.idusu===usuarioSeleccionado.idusu)
        {
          axios.put(`${constantes.URL_SERVIDOR +'/usuarios'}/${usuarioSeleccionado.idusu}`, usuarioSeleccionado)
          .then((response)=>{
            Swal.fire(
              'Actualizado',
              `El registro ${usuarioSeleccionado.nombre} ha sido actualizado exitosamente`,
              'success'
            )
            getusuarios().then((response)=>{
            setUsuarios(response.data)})
          })
          
        }
        setUsuarios(nuevaData);
        setModalEditar(false);
      });            
      };
    

    useEffect(() =>{
        getusuarios().then((response)=>{
          setUsuarios(response.data)})    
    
     }, [setUsuarios]);

     function eliminarUsuario (idUsuario) {
      axios.delete(constantes.URL_SERVIDOR +'/usuarios/'+idUsuario)
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
                  `El registro ${idUsuario} ha sido eliminado exitosamente`,
                  'success'
                );
                setModalEditar(false); 
                getusuarios().then((response)=>{
                setUsuarios(response.data)}) 
              } else {
                setModalEditar(false);   
              }
          });
          }
        });
      };

    
     
    return(      

    <Fragment>
        <div className="table-general">
        <p>ADMINISTRACION DE USUARIOS</p>            
          <Table striped bordered hover>
            <thead> 
              <tr>                                
                <th>Nombres</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {usuarios.map((usuario, key)=>        
              <tr key={usuario.idusu}>                
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.contrasena}</td>                
                <td><Button variant="outline-primary" onClick={() => seleccionarUsuario(usuario)}>Editar</Button>{"  "}
                <Button onClick={() => eliminarUsuario(usuario.idusu)} variant="outline-danger">Eliminar</Button>{"  "}
                <Link className="btn btn-success" to={"/encuestas"}>Listar Encuestas
                </Link></td>              
              </tr>
            )}  
            </tbody>
          </Table>

          <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="idusu"
              value={usuarioSeleccionado && usuarioSeleccionado.idusu}             
            />
            <br />

            <label>Nombres y Apellidos</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={usuarioSeleccionado && usuarioSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Correo</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={usuarioSeleccionado && usuarioSeleccionado.email}
              onChange={handleChange}
            />
            <br />

            <label>Contraseña</label>
            <input
              className="form-control"
              type="password"
              name="contrasena"
              value={usuarioSeleccionado && usuarioSeleccionado.contrasena}
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

export default Usuarios;