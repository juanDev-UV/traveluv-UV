import { useState } from 'react';
import api from '../services/api';
import MapInput from '../components/MapInput';
import './PublicarViaje.css';

function PublicarCarga() {
  const [form, setForm] = useState({
    Peso: '',
    Dimensiones: '',
    Fragil: '',
    UbicacionRecogida: '',
    UbicacionEntrega: '',
    PrecioOfrecido: '',
    ID_Vehiculo: '',
    CoordenadasRecogidaLat: '',
    CoordenadasRecogidaLng: ''
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
      const location = await geocodificarDireccion(form.UbicacionRecogida);
      const datos = {
        ...form,
        CoordenadasRecogidaLat: location.lat,
        CoordenadasRecogidaLng: location.lng
      };
      await api.post('/cargas/crear', datos);
      alert('Carga publicada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al publicar la carga');
    }
  };

  return (
    <div className="publicar-viaje-container">
      <h2 className="titulo">📦 Publicar Carga</h2>

      <label>Peso (kg)</label>
      <input name="Peso" type="number" placeholder="Ej. 15" onChange={handleChange} />

      <label>Dimensiones</label>
      <input name="Dimensiones" placeholder="Ej. 40x40x60 cm" onChange={handleChange} />

      <label>¿Es frágil?</label>
      <select name="Fragil" onChange={handleChange}>
        <option value="">Selecciona</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      <label>Ubicación de Recogida</label>
      <MapInput
        placeholder="Ej. Cra 45 #10-55, Cali"
        onPlaceSelected={(direccion) => setForm({ ...form, UbicacionRecogida: direccion })}
      />

      <label>Ubicación de Entrega</label>
      <MapInput
        placeholder="Ej. Cl 15 #12-22, Bogotá"
        onPlaceSelected={(direccion) => setForm({ ...form, UbicacionEntrega: direccion })}
      />

      <label>Precio ofrecido (COP)</label>
      <input name="PrecioOfrecido" type="number" placeholder="Ej. 20000" onChange={handleChange} />

      <label>ID del vehículo</label>
      <input name="ID_Vehiculo" placeholder="Ej. 5" onChange={handleChange} />

      <button className="btn-publicar" onClick={publicar}>📤 Publicar Carga</button>
    </div>
  );
}

export default PublicarCarga;