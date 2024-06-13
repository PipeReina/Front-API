import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../nav/Nav";
import { Modal, Button, Form } from 'react-bootstrap';
import "./asignatura.css";
import { cerrarSesion } from '../utilidades'; 
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ListA = ({ brand }) => {
  const url = "http://localhost:3000/asignaturas";
  const [asignatura, setAsignatura] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [credito, setCredito] = useState('');
  const [hora, setHora] = useState('');
  const [grupo, setGrupo] = useState('');
  const [horario, setHorario] = useState('');
  const [operacion, setOperacion] = useState(1);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    getAsignatura();
  }, []);

  const getAsignatura = async () => {
    try {
      const respuesta = await axios.get(url);
      setAsignatura(respuesta.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const openModal = (op, id, nombre, credito, hora, grupo, horario) => {
    setCodigo('');
    setNombre('');
    setCredito('');
    setHora('');
    setGrupo('');
    setHorario('');
    setOperacion(op);

    if (op === 1) {
      setTitle('Registrar Asignatura');
    } else if (op === 2) {
      setTitle('Editar Asignatura');
      setCodigo(id);
      setNombre(nombre);
      setCredito(credito);
      setHora(hora);
      setGrupo(grupo);
      setHorario(horario);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCodigoChange = (e) => setCodigo(e.target.value);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleCreditosChange = (e) => setCredito(e.target.value);
  const handleHorasChange = (e) => setHora(e.target.value);
  const handleGruposChange = (e) => setGrupo(e.target.value);
  const handleHorariosChange = (e) => setHorario(e.target.value);


  const handleSaveChanges = async () => {
    const asignatura = {
      cod_a: codigo,
      nom_a: nombre,
      creditos: credito,
      int_h: hora,
      grupo: grupo,
      horario: horario
    };

    try {
      if (operacion === 1) {

        await axios.post(url, asignatura);

      } else if (operacion === 2) {

        await axios.put(`${url}/${codigo}`, asignatura);
      }
      getAsignatura(); 
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
          <h1>Tabla Asignaturas CRUD</h1>
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
                  <th>credito</th>
                  <th>Horas</th>
                  <th>Grupo</th>
                  <th>Horario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-body">
                {asignatura.map((asignatura) => (
                  <tr key={asignatura.cod_a}>
                    <td>{asignatura.cod_a}</td>
                    <td>{asignatura.nom_a}</td>
                    <td>{asignatura.creditos}</td>
                    <td>{asignatura.int_h}</td>
                    <td>{asignatura.grupo}</td>
                    <td>{asignatura.horario}</td>
                    <td className="Accion">
                      <Button className="action-btn" onClick={() => openModal(2, asignatura.cod_a, asignatura.nom_a, asignatura.creditos, asignatura.int_h, asignatura.grupo, asignatura.horario)}>
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
            <Form.Group className="mb-3" controlId="creditos">
              <Form.Label>Creditos</Form.Label>
              <Form.Control type="text" value={credito} onChange={handleCreditosChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hora">
              <Form.Label>Horas</Form.Label>
              <Form.Control type="text" value={hora} onChange={handleHorasChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="grupo">
              <Form.Label>Grupo</Form.Label>
              <Form.Control type="text" value={grupo} onChange={handleGruposChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="horario">
              <Form.Label>Horario</Form.Label>
              <Form.Control type="text" value={horario} onChange={handleHorariosChange} />
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

export default ListA;
