// Nav.js

import React from "react";
import imgNav from "./logo-libertadores-2020-1.png";
import Cookies from 'universal-cookie';
import "./nav.css"

const cookies = new Cookies();

const Nav = ({ cerrarSesion, tipoVista }) => {
  // Configuraciones de navegación
  const configuracionesNavegacion = {
    HomeP: [
      { id: 3, nombre: "Asignaturas", link: "/asignaturas" },
      { id: 4, nombre: "Estudiantes", link: "/estudiantes" },
      { id: 5, nombre: "Profesores", link: "/profesores" },
      { id: 6, nombre: "Cerrar Sesión", link: "/." },
      ],
      HomeE: [
        { id: 1, nombre: "Asignaturas", link: "/asignaturas" },
        { id: 3, nombre: "Cerrar Sesión", link: "/." },
        ],
        default: [
          { id: 1, nombre: "Inicio", link: "../" },
          { id: 2, nombre: "Cerrar Sesión", link: "/." },
    ],
  };

  // Obtener la configuración de navegación basada en el tipo de vista
  const navItems = configuracionesNavegacion[tipoVista] || configuracionesNavegacion.default;

  return (
    <header className="header">
      <div className="logo">
        <a href="https://www.ulibertadores.edu.co/">
          <img src={imgNav} alt="Logo de la marca" />
        </a>
      </div>
      <nav>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.id}>
              <a href={item.link}>{item.nombre}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
