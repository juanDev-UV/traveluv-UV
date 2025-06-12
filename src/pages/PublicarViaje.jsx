import { useState } from 'react';
import api from '../services/api';

function PublicarViaje() {
  const [viaje, setViaje] = useState({
    Origen: '',
    Destino: '',
    FechaHoraSalida: '',
    CuposDisponibles: '',
    PrecioKM: '',
    ID_Vehiculo: ''
  });

  const handleChange = e => {
    setViaje({ ...viaje, [e.target.name]: e.target.value });
  };

  const publicar = async () => {
    try {
      const res = await api.post('/viajes/crear', viaje);
      alert('Viaje publicado: ID ' + res.data.id);
    } catch (err) {
      alert('Error al publicar viaje');
    }
  };

  return (
    <div>
      <h2>Publicar Viaje</h2>
      <input name="Origen" placeholder="Origen" onChange={handleChange} />
      <input name="Destino" placeholder="Destino" onChange={handleChange} />
      <input name="FechaHoraSalida" type="datetime-local" onChange={handleChange} />
      <input name="CuposDisponibles" type="number" onChange={handleChange} />
      <input name="PrecioKM" type="number" step="0.01" onChange={handleChange} />
      <input name="ID_Vehiculo" type="number" onChange={handleChange} placeholder="ID Vehículo" />
      <button onClick={publicar}>Publicar</button>
    </div>
  );
}

export default PublicarViaje;
