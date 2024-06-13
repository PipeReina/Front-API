// estudiantes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../nav/Nav";
import { Modal, Button, Form } from 'react-bootstrap';
import "./estudiantes.css";
import { cerrarSesion } from '../utilidades'; 
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ListE = ({ brand }) => {
  const url = "http://localhost:3000/estudiantes";
  const [estudiantes, setEstudiantes] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [estado, setEstado] = useState('');
  const [operacion, setOperacion] = useState(1);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    getEstudiantes();
  }, []);

  const getEstudiantes = async () => {
    try {
      const respuesta = await axios.get(url);
      setEstudiantes(respuesta.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const openModal = (op, id, nombre, direc, tel, fecha, users, estado) => {
    setCodigo('');
    setNombre('');
    setDireccion('');
    setTelefono('');
    setFecha('');
    setUsuario('');
    setEstado('');
    setOperacion(op);

    if (op === 1) {
      setTitle('Registrar Estudiante');
    } else if (op === 2) {
      setTitle('Editar Estudiante');
      setCodigo(id);
      setNombre(nombre);
      setDireccion(direc);
      setTelefono(tel);
      setFecha(fecha);
      setUsuario(users);
      setEstado(estado ? '1' : '0'); 
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCodigoChange = (e) => setCodigo(e.target.value);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDireccionChange = (e) => setDireccion(e.target.value);
  const handleTelefonoChange = (e) => setTelefono(e.target.value);
  const handleFechaChange = (e) => setFecha(e.target.value);
  const handleUsuarioChange = (e) => setUsuario(e.target.value);
  const handleEstadoChange = (e) => setEstado(e.target.value);

  const handleSaveChanges = async () => {
    const estudiante = {
      cod_e: codigo,
      nom_e: nombre,
      dir_e: direccion,
      tel_e: telefono,
      fech_nac: fecha,
      tipo_u: usuario,
      est_e: estado === '1' ? 1 : 0  
    };

    try {
      if (operacion === 1) {

        await axios.post(url, estudiante);

      } else if (operacion === 2) {

        await axios.put(`${url}/${codigo}`, estudiante);
      }
      getEstudiantes(); 
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }

    handleCloseModal();
  };

  return (
    <div className="App">
      <div className="container-fluid"></div>
      <Nav cerrarSesion={cerrarSesion} />
      <div className="too">
        <div className="conta">
          <h1>Tabla Estudiantes CRUD</h1>
          <Button id="btn-agregar" className="button-plus" onClick={() => openModal(1)}>
            <i className="fas fa-circle-plus"></i> Añadir
          </Button>
          <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Telefono</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-body">
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.cod_e}>
                    <td>{estudiante.cod_e}</td>
                    <td>{estudiante.nom_e}</td>
                    <td>{estudiante.dir_e}</td>
                    <td>{estudiante.tel_e}</td>
                    <td>{estudiante.fech_nac}</td>
                    <td>{estudiante.tipo_u}</td>
                    <td>{estudiante.est_e ? 'Activo' : 'Inactivo'}</td>
                    <td className="Accion">
                      <Button className="action-btn" onClick={() => openModal(2, estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.tipo_u, estudiante.est_e)}>
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button className="action-btn">
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="codigo">
              <Form.Label>Código</Form.Label>
              <Form.Control type="text" value={codigo} onChange={handleCodigoChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={handleNombreChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" value={direccion} onChange={handleDireccionChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" value={telefono} onChange={handleTelefonoChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" value={fecha} onChange={handleFechaChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="usuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control as="select" value={usuario} onChange={handleUsuarioChange}>
                <option value="Estudiante">Estudiante</option>
                <option value="Profesor">Profesor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="estado">
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" value={estado} onChange={handleEstadoChange}>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListE;
