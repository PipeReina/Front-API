import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomeE from "./Components/estudiantes/Home/home"
import HomeP from "./Components/profesores/Home/home"
import ListP from "./Components/TablaProfes/profesores"
import ListE from "./Components/TableEstudiantes/estudiantes"
import ListA from "./Components/TablaAsignatura/asignaturas"
import Login from "./Components/login/login"
import {cerrarSesion} from "./Components/utilidades"
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route> 
        <Route path='/home-e' element={<HomeE cerrarSesion={cerrarSesion}></HomeE>}></Route> 
        <Route path='/asignaturas' element={<ListA cerrarSesion={cerrarSesion}></ListA>}></Route> 
        <Route path='/profesores' element={<ListP cerrarSesion={cerrarSesion}></ListP>}></Route> 
        <Route path='/estudiantes' element={<ListE cerrarSesion={cerrarSesion}></ListE>}></Route> 
        <Route path='/home-p' element={<HomeP cerrarSesion={cerrarSesion}></HomeP>}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
