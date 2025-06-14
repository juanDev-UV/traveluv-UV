import { useState } from 'react';
import api from '../services/api';

function PublicarViaje() {
  const [form, setForm] = useState({
    Origen: '', Destino: '', FechaHoraSalida: '', CuposDisponibles: '', PrecioKM: '', ID_Vehiculo: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const publicar = async () => {
    await api.post('/viajes/crear', form);
    alert('Viaje publicado');
  };

  return (
    <div className='container'>
      <h2>Publicar Viaje</h2>
      <input name="Origen" onChange={handleChange} placeholder="Origen" />
      <input name="Destino" onChange={handleChange} placeholder="Destino" />
      <input name="FechaHoraSalida" type="datetime-local" onChange={handleChange} />
      <input name="CuposDisponibles" type="number" onChange={handleChange} />
      <input name="PrecioKM" type="number" onChange={handleChange} />
      <input name="ID_Vehiculo" onChange={handleChange} placeholder="ID Vehículo" />
      <button onClick={publicar}>Publicar</button>
    </div>
  );
}

export default PublicarViaje