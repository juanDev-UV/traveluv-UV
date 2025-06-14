import { Link } from 'react-router-dom';

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav>
      <Link to="/">Inicio</Link> | 
      <Link to="/viajes/publicar">Publicar Viaje</Link> | 
      <Link to="/cargas/publicar">Publicar Carga</Link> | 
      <Link to="/viajes">Buscar Viajes</Link> | 
      <Link to="/cargas">Buscar Cargas</Link> | 
      <Link to="/reservas">Mis Reservas</Link> | 
      <Link to="/valoraciones">Valoraciones</Link> | 
      <Link to="/verificar">Verificar Identidad</Link> | 
      <Link to="/perfil">Perfil</Link> | 
      <button onClick={logout}>Salir</button>
    </nav>
  );
}
