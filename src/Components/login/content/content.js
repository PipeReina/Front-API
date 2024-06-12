import React, { useEffect, useRef } from 'react';
import ImgLogo from "../logo-retina.png";
import '../login.css';

const Content = ({ form, handleChange, iniciarSesion }) => {
  const loginContainerRef = useRef(null);
  const imgContainerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (loginContainerRef.current && imgContainerRef.current) {
        loginContainerRef.current.classList.add('login-container-show');
        imgContainerRef.current.classList.add('img-show');
        imgContainerRef.current.classList.remove('img');
        loginContainerRef.current.classList.add('login-container');
      }
    }, 500);
  }, []);

  return (
    <div className="body">
      <div ref={loginContainerRef} className="login-container">
        <div className="logo">
          <a href="https://www.ulibertadores.edu.co/">
            <img src={ImgLogo} alt="Logo de la marca" />
          </a>
        </div>
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Usuario</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button onClick={iniciarSesion}>Ingresar</button>
        </div>
      </div>
      <div ref={imgContainerRef} className="img"></div>
    </div>
  );
};

export default Content;
