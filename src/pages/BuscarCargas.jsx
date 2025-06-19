import { useState } from 'react';
import api from '../services/api';
import MapInput from '../components/MapInput';
import './BuscarCargas.css';

function BuscarCargas() {
  const [datos, setDatos] = useState([]);
  const [query, setQuery] = useState({ desde: '', hasta: '' });

  const buscar = async () => {
    const res = await api.get(`/reservas/cargas?desde=${query.desde}&hasta=${query.hasta}`);
    setDatos(res.data);
  };

  return (
    <section className='buscar-cargas-container'>
      <div className='buscar-section'>
        <h2 className='titulo'>🔍 Buscar Cargas</h2>

        <label>Ubicación de Recogida</label>
        <MapInput
          placeholder="Desde"
          onPlaceSelected={(direccion) => setQuery({ ...query, desde: direccion })}
        />

        <label>Ubicación de Entrega</label>
        <MapInput
          placeholder="Hasta"
          onPlaceSelected={(direccion) => setQuery({ ...query, hasta: direccion })}
        />

        <button className='btn-buscar' onClick={buscar}>Buscar</button>

        <ul className='lista-cargas'>
          {datos.map(c => (
            <li key={c.ID_Carga} className='item-carga'>
              📦 {c.UbicacionRecogida} → {c.UbicacionEntrega}
            </li>
          ))}
        </ul>
      </div>

      <div className='publicar-section'>
        <h2 className='titulo-publicar'>📤 ¿Tienes algo que enviar?</h2>
        <p>Publica una carga y encuentra a un conductor de confianza.</p>
        <a className='button-carga' href="/cargas/publicar">
          ➕ Publicar Carga
        </a>
      </div>
    </section>
  );
}





export default BuscarCargas;