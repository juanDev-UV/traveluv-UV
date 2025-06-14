import { useEffect, useState } from 'react';
import api from '../services/api';

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get(`/reservas/usuario/${id}`).then(res => setReservas(res.data));
  }, [id]);

  return (
    <div className='container'>
      <h2>Mis Reservas</h2>
      <ul>
        {reservas.map(r => (
          <li key={r.ID_Reserva}>{r.Origen || r.UbicacionRecogida} → {r.Destino || r.UbicacionEntrega}</li>
        ))}
      </ul>
    </div>
  );
}


export default MisReservas