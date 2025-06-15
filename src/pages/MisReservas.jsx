import { useEffect, useState } from 'react';
import api from '../services/api';
import './MisReservas.css';

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get(`/reservas/usuario/${id}`).then(res => setReservas(res.data));
  }, [id]);

  return (
    <div className="reservas-container">
      <h2 className="titulo">📅 Mis Reservas</h2>
      {reservas.length === 0 ? (
        <p className="mensaje-vacio">No tienes reservas registradas.</p>
      ) : (
        <ul className="lista-reservas">
          {reservas.map(r => (
            <li key={r.ID_Reserva} className="reserva-item">
              <div className="reserva-info">
                {r.Origen || r.UbicacionRecogida} → {r.Destino || r.UbicacionEntrega}
              </div>
              <div className="reserva-info">
                Estado: <strong>{r.Estado}</strong>
              </div>
              <div className="reserva-info">
                Total: $ {Number(r.MontoTotal).toLocaleString('es-CO')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisReservas;