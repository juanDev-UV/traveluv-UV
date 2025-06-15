import { useState } from 'react';
import api from '../services/api';
import MapInput from '../components/MapInput';
import './PublicarViaje.css';

function PublicarViaje() {
  const [form, setForm] = useState({
    Origen: '',
    Destino: '',
    FechaHoraSalida: '',
    CuposDisponibles: '',
    PrecioKM: '',
    ID_Vehiculo: '',
    CoordenadasOrigenLat: '',
    CoordenadasOrigenLng: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const geocodificarDireccion = async (direccion) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return location; // { lat, lng }
    } else {
      throw new Error('No se pudo geocodificar la dirección');
    }
  };

  const publicar = async () => {
    try {
      const location = await geocodificarDireccion(form.Origen);
      const datos = {
        ...form,
        CoordenadasOrigenLat: location.lat,
        CoordenadasOrigenLng: location.lng
      };
      await api.post('/viajes/crear', datos);
      alert('Viaje publicado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al publicar el viaje');
    }
  };

  return (
    <div className="publicar-viaje-container">
      <h2 className="titulo">🛣️ Publicar Viaje</h2>

      <label>Origen</label>
      <MapInput
        placeholder="Ej. Cali - Terminal Sur"
        onPlaceSelected={(direccion) => setForm({ ...form, Origen: direccion })}
      />

      <label>Destino</label>
      <MapInput
        placeholder="Ej. Medellín - Terminal Norte"
        onPlaceSelected={(direccion) => setForm({ ...form, Destino: direccion })}
      />

      <label>Fecha y hora de salida</label>
      <input name="FechaHoraSalida" type="datetime-local" onChange={handleChange} />

      <label>Cupos disponibles</label>
      <input name="CuposDisponibles" type="number" placeholder="Ej. 3" onChange={handleChange} />

      <label>Precio por kilómetro (COP)</label>
      <input name="PrecioKM" type="number" placeholder="Ej. 200" onChange={handleChange} />

      <label>ID del vehículo</label>
      <input name="ID_Vehiculo" placeholder="Ej. 2" onChange={handleChange} />

      <button className="btn-publicar" onClick={publicar}>🚗 Publicar Viaje</button>
    </div>
  );
}

export default PublicarViaje;
