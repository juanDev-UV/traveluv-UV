import { useState, useEffect } from 'react';
import api from '../services/api';
import './Valoraciones.css';

function Valoraciones() {
  const [vals, setVals] = useState([]);
  const id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get(`/valoraciones/usuario/${id}`).then(res => setVals(res.data));
  }, [id]);

  return (
    <div className="valoraciones-container">
      <h2 className="titulo">🌟 Valoraciones Recibidas</h2>

      {vals.length === 0 ? (
        <p className="mensaje-vacio">Aún no has recibido valoraciones.</p>
      ) : (
        <ul className="lista-valoraciones">
          {vals.map((v, i) => (
            <li key={i} className="valoracion-item">
              <div className="emisor">🧑 {v.Emisor}</div>
              <div className="calificacion">⭐ {v.Calificacion} / 5</div>
              <div className="comentario">"{v.Comentario}"</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Valoraciones;