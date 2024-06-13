// HomeP.js

import React, { Component } from 'react';
import Nav from '../../nav/Nav';
import Cookies from 'universal-cookie';
import './home.css'; 
import { cerrarSesion } from '../../utilidades'; 

const cookies = new Cookies();

class HomeP extends Component {


  
  render() {
    const nombre = cookies.get('Nombre') || 'Invitado';
    const tipoU = cookies.get('Usuario') || 'Usuario';

    return (
      <div className="main-container">
        <Nav cerrarSesion={this.props.cerrarSesion} tipoVista="HomeP" />
        <div className="main-content">
          <h1 className="title"> {tipoU} {nombre}</h1>
          <div className="hero">
            <div className="hero-content">
              <h1>Bienvenido al Panel de Administración</h1>
              <p>Gestiona usuarios y reportes de manera eficiente.</p>
            </div>
            <div className="tar">
            <div className="feature">
              <i className="fas fa-book"></i>
              <h3>Materias</h3>
              <p>Consulta y gestiona todas tus materias fácilmente.</p>
            </div>
            <div className="feature">
              <i className="fas fa-chalkboard-teacher"></i>
              <h3>Clases</h3>
              <p>Planifica y organiza tus clases de manera eficiente.</p>
            </div>
            <div className="feature">
              <i className="fas fa-calendar-alt"></i>
              <h3>Horario</h3>
              <p>Administra tu horario y mantén un seguimiento de tus actividades.</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeP;
