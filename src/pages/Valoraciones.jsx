import { useState, useEffect } from 'react';
import api from '../services/api';

function Valoraciones() {
  const [vals, setVals] = useState([]);
  const id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get(`/valoraciones/usuario/${id}`).then(res => setVals(res.data));
  }, [id]);

  return (
    <div className='container'>
      <h2>Valoraciones Recibidas</h2>
      <ul>
        {vals.map((v, i) => (
          <li key={i}>{v.Emisor}: {v.Calificacion} ⭐ - {v.Comentario}</li>
        ))}
      </ul>
    </div>
  );
}

export default Valoraciones
