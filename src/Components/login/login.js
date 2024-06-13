import React, { Component } from 'react';
import Content from './content/content';
import './login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const url = "http://localhost:3000/estudiantes/users";
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: '',
      password: '',
    }
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  };

  iniciarSesion = async () => {
    const { username, password } = this.state.form;
    const passwordInt = parseInt(password);
  
    await axios.get(url)
    .then(response => {
      const usuarios = response.data;
      const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === username && usuario.id === passwordInt);
      
      if (usuarioEncontrado) {
        console.log('Usuario encontrado:', usuarioEncontrado);
        var respuesta=usuarioEncontrado;
        cookies.set('Nombre', respuesta.nombre, {path:"/"});  
        cookies.set('Usuario', respuesta.Usuario, {path:"/"});
        alert(`Bienvenido ${respuesta.Usuario}  ${respuesta.nombre}`);
        if(respuesta.Usuario==="Estudiante"){
          window.location.href="./home-e"
        }else{
          window.location.href="./home-p"
        }

      } else {
        console.log('Usuario no encontrado');
        alert('Usuario no encontrado o contraseña incorrecta');
      }
    })
    .catch(error => {
      console.log('Error al buscar el usuario:', error);
    });
};
  
  
  

  render() {
    return <Content form={this.state.form} handleChange={this.handleChange} iniciarSesion={this.iniciarSesion} />;
  }
}

export default Login;
