import { useState } from 'react';
import api from '../services/api';
import MapInput from '../components/MapInput';
import './BuscarViajes.css';

function BuscarViajes() {
  const [viajes, setViajes] = useState([]);
  const [query, setQuery] = useState({ desde: '', hasta: '' });

  const buscar = async () => {
    if (!query.desde || !query.hasta) {
      alert('Debes ingresar una ubicación de origen y destino.');
      return;
    }

    try {
      console.log('Buscando desde:', query.desde);
      console.log('Buscando hasta:', query.hasta);
      const res = await api.get(`/reservas/viajes?desde=${query.desde}&hasta=${query.hasta}`);
      setViajes(res.data);
    } catch (error) {
      console.error('Error al buscar viajes:', error);
      alert('Ocurrió un error al buscar los viajes.');
    }
  };

  return (
    <section className="buscar-viajes-container">
      <div className="buscar-section">
        <h2 className="titulo">🔍 Buscar Viajes</h2>

        <label>Origen</label>
        <MapInput
          placeholder="Ej. Medellín"
          onPlaceSelected={(direccion) => setQuery({ ...query, desde: direccion })}
        />

        <label>Destino</label>
        <MapInput
          placeholder="Ej. Cartagena"
          onPlaceSelected={(direccion) => setQuery({ ...query, hasta: direccion })}
        />

        <button className="btn-buscar" onClick={buscar}>Buscar</button>

        {viajes.length > 0 ? (
          <ul className="lista-viajes">
            {viajes.map(v => (
              <li key={v.ID_Viaje} className="item-viaje">
                🚌 {v.Origen} → {v.Destino}<br />
                <strong>Fecha:</strong> {new Date(v.FechaHoraSalida).toLocaleString()}<br />
                <strong>Cupos:</strong> {v.CuposDisponibles} | <strong>Precio:</strong> ${v.PrecioKM} COP/km
              </li>
            ))}
          </ul>
        ) : (
          <p className="mensaje-vacio">No hay viajes disponibles con esos criterios.</p>
        )}
      </div>

      <div className="publicar-section">
        <h2 className="titulo-publicar">🛣️ ¿Planeas un viaje?</h2>
        <p>Publica tu viaje y permite que otros reserven su cupo contigo.</p>
        <a className="button-viaje" href="/viajes/publicar">
          ➕ Publicar Viaje
        </a>
      </div>
    </section>
  );
}

export default BuscarViajes;