import Swal from "sweetalert2";
import withReactContect from "sweetalert2-react-content";

export function show_alerta(mensaje, icono, foco){
    onfocus(foco);
    const MySwal = withReactContect(Swal);
    MySwal.fire({
        title:mensaje,
        icono:icono,
    })
}

function onfocus(foco){
    if(foco!==" "){
        document.getElementById(foco).focus();
    }
}