import {BrowserRouter, Routes, Route} from "react-router-dom"
import Nav from "./Components/estudiantes/nav/Nav"
import ListE from "./Components/estudiantes/TableEstudiantes/estudiantes"
import Login from "./Components/login/login"
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route> 
        <Route path='/Home' element={<ListE></ListE>}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
