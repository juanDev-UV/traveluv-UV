import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav>
      <Link to="/">Inicio</Link> | 
      <Link to="/viajes">Viajes</Link> | 
      <Link to="/cargas">Cargas</Link> | 
      <Link to="/reservas">Mis Reservas</Link> | 
      <Link to="/valoraciones">Valoraciones</Link> | 
      <Link to="/verificar">Verificar Identidad</Link> | 
      <Link to="/perfil">Perfil</Link> | 
    </nav>
  );
}
