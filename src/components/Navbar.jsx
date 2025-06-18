import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar({ tipoUsuario }) {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>

        {tipoUsuario === '2' && (
          <>
            <li><Link to="/viajes">Viajes</Link></li>
            <li><Link to="/cargas">Cargas</Link></li>
            <li><Link to="/vehiculo">Vehículo</Link></li>
            <li><Link to="/valoraciones">Valoraciones</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
          </>
        )}

        {tipoUsuario === '1' && (
          <>
          <li><Link to="/reservas">Mis Reservas</Link></li>
          <li><Link to="/valoraciones">Valoraciones</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
          </>
        )}


      </ul>
    </nav>
  );
}

export default Navbar;
