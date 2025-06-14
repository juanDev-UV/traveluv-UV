import { useState } from 'react';
import api from '../services/api';

function BuscarViajes() {
  const [datos, setDatos] = useState([]);
  const [query, setQuery] = useState({ origen: '', destino: '' });

  const buscar = async () => {
    const res = await api.get(`/reservas/viajes?origen=${query.origen}&destino=${query.destino}`);
    setDatos(res.data);
  };

  return (
    <div className='container'>
      <h2>Buscar Viajes</h2>
      <input name="origen" onChange={e => setQuery({ ...query, origen: e.target.value })} />
      <input name="destino" onChange={e => setQuery({ ...query, destino: e.target.value })} />
      <button onClick={buscar}>Buscar</button>
      <ul>
        {datos.map(v => <li key={v.ID_Viaje}>{v.Origen} - {v.Destino} ({v.FechaHoraSalida})</li>)}
      </ul>
    </div>
  );
}

export default BuscarViajes