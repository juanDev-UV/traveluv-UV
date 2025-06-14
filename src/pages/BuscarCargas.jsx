import { useState } from 'react';
import api from '../services/api';

function BuscarCargas() {
  const [datos, setDatos] = useState([]);
  const [query, setQuery] = useState({ desde: '', hasta: '' });

  const buscar = async () => {
    const res = await api.get(`/reservas/cargas?desde=${query.desde}&hasta=${query.hasta}`);
    setDatos(res.data);
  };

  return (
    <div className='container'>
      <h2>Buscar Cargas</h2>
      <input name="desde" onChange={e => setQuery({ ...query, desde: e.target.value })} />
      <input name="hasta" onChange={e => setQuery({ ...query, hasta: e.target.value })} />
      <button onClick={buscar}>Buscar</button>
      <ul>
        {datos.map(c => <li key={c.ID_Carga}>{c.UbicacionRecogida} → {c.UbicacionEntrega}</li>)}
      </ul>
    </div>
  );
}

export default BuscarCargas