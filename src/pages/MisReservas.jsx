import { useState } from 'react';
import api from '../services/api';
import MapInput from '../components/MapInput';
import './MisReservas.css';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [cargas, setCargas] = useState([]);
  const [mostrarViajes, setMostrarViajes] = useState(false);
  const [mostrarCargas, setMostrarCargas] = useState(false);
  const [nuevaReserva, setNuevaReserva] = useState({
    ID_Viaje: '',
    ID_Carga: '',
    LugarAbordaje: '',
    LugarBajada: '',
    MontoTotal: ''
  });

  const idUsuario = localStorage.getItem('user_id');


  const obtenerReservas = async () => {
    const res = await api.get(`/reservas/usuario/${idUsuario}`);
    setReservas(res.data);
  };

  const obtenerViajes = async () => {
    const res = await api.get('/viajes');
    setViajes(res.data);
    setMostrarViajes(true);
    setMostrarCargas(false);
  };

  const obtenerCargas = async () => {
    const res = await api.get('/cargas');
    setCargas(res.data);
    setMostrarCargas(true);
    setMostrarViajes(false);
  };

  const handleViajeChange = (e) => {
    setNuevaReserva({
      ...nuevaReserva,
      ID_Viaje: e.target.value,
      ID_Carga: ''
    });
  };

  const handleCargaChange = (e) => {
    setNuevaReserva({
      ...nuevaReserva,
      ID_Carga: e.target.value,
      ID_Viaje: ''
    });
  };

  const handleChange = e =>
    setNuevaReserva({ ...nuevaReserva, [e.target.name]: e.target.value });

  const guardarReserva = async () => {
    if (!nuevaReserva.ID_Viaje && !nuevaReserva.ID_Carga) {
      return alert('Debes seleccionar un viaje o una carga');
    }

    try {
      const data = {
        ...nuevaReserva,
        ID_Usuario: idUsuario,
        Estado: 'pendiente'
      };
      await api.post('/viaje', data);
      alert('Reserva creada correctamente');
      obtenerReservas();
    } catch (error) {
      console.error(error);
      alert('Error al crear la reserva');
    }
  };

  return (
    <div className="section-reservas">
      <div className="panel-reservas">
        <h2>📦 Tus Reservas</h2>
        <ul className="lista-reservas">
          {reservas.map(r => (
            <li key={r.ID_Reserva}>
              {r.Origen || r.UbicacionRecogida} → {r.Destino || r.UbicacionEntrega} | Estado: {r.Estado}
            </li>
          ))}
        </ul>
      </div>

      <div className="panel-formulario">
        <h2>➕ Agregar Reserva</h2>
        <button onClick={obtenerViajes}>📍 Ver Viajes Disponibles</button>
        <button onClick={obtenerCargas}>📦 Ver Cargas Disponibles</button>

        {mostrarViajes && (
          <>
            <label>Selecciona un Viaje</label>
            <select name="ID_Viaje" onChange={handleViajeChange}>
              <option value="">-- Selecciona --</option>
              {viajes.map(v => (
                <option key={v.ID_Viaje} value={v.ID_Viaje}>
                  {v.Origen} → {v.Destino} - {v.CuposDisponibles} cupos
                </option>
              ))}
            </select>
          </>
        )}

        {mostrarCargas && (
          <>
            <label>Selecciona una Carga</label>
            <select name="ID_Carga" onChange={handleCargaChange}>
              <option value="">-- Selecciona --</option>
              {cargas.map(c => (
                <option key={c.ID_Carga} value={c.ID_Carga}>
                  {c.UbicacionRecogida} → {c.UbicacionEntrega}
                </option>
              ))}
            </select>
          </>
        )}

        <label>Lugar de Abordaje</label>
        <MapInput
          placeholder="Ej. Calle 10, Bogotá"
          onPlaceSelected={(direccion) =>
            setNuevaReserva(prev => ({ ...prev, LugarAbordaje: direccion }))
          }
        />

        <label>Lugar de Bajada</label>
        <MapInput
          placeholder="Ej. Carrera 5, Medellín"
          onPlaceSelected={(direccion) =>
            setNuevaReserva(prev => ({ ...prev, LugarBajada: direccion }))
          }
        />

        <label>Monto Total</label>
        <input name="MontoTotal" type="number" onChange={handleChange} />

        <button onClick={guardarReserva}>💾 Guardar Reserva</button>
      </div>
    </div>
  );
}

export default Reservas;
