import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const cerrarSesion = () => {
  cookies.remove('id', { path: "/" });
  cookies.remove('Nombre', { path: "/" });
  cookies.remove('Usuario', { path: "/" });

  window.location.href = "./";
};
