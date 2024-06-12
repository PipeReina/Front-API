import React, { Component } from "react";
import imgNav from "./logo-libertadores-2020-1.png";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Nav extends Component {

  cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('Nombre', { path: "/" });
    cookies.remove('Usuario', { path: "/" });

    window.location.href = "./";
  }

  render() {
    console.log("Este es el nombre: " + cookies.get('Nombre'));
    console.log("Este es el usuario: " + cookies.get('Usuario'));

    return (
      <header className="header">
        <div className="logo">
          <a href="https://www.ulibertadores.edu.co/">
            <img src={imgNav} alt="Logo de la marca" />
          </a>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Materias</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a onClick={this.cerrarSesion}>Cerrar</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;
