import { useEffect, useState } from 'react';
import api from '../services/api';

function Perfil() {
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    // Supongamos que el ID del usuario está guardado
    const id = localStorage.getItem('user_id');
    api.get(`/usuarios/${id}`).then(res => setPerfil(res.data));
  }, []);

  return (
    <div className='container'>
      <h2>Mi Perfil</h2>
      <pre>{JSON.stringify(perfil, null, 2)}</pre>
    </div>
  );
}

export default Perfil