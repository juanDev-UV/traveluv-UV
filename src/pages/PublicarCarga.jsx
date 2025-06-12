import { useState } from 'react';
import api from '../services/api';

function PublicarCarga() {
  const [carga, setCarga] = useState({
    Peso: '',
    Dimensiones: '',
    Fragil: '',
    UbicacionRecogida: '',
    UbicacionEntrega: '',
    PrecioOfrecido: '',
    ID_Vehiculo: ''
  });

  const handleChange = e => {
    setCarga({ ...carga, [e.target.name]: e.target.value });
  };

  const publicar = async () => {
    try {
      const res = await api.post('/cargas/crear', carga);
      alert('Carga publicada: ID ' + res.data.id);
    } catch (err) {
      alert('Error al publicar carga');
    }
  };

  return (
    <div>
      <h2>Publicar Carga</h2>
      <input name="Peso" type="number" step="0.1" onChange={handleChange} />
      <input name="Dimensiones" placeholder="Ej: 40x30x20" onChange={handleChange} />
      <input name="Fragil" placeholder="Sí/No" onChange={handleChange} />
      <input name="UbicacionRecogida" placeholder="Desde" onChange={handleChange} />
      <input name="UbicacionEntrega" placeholder="Hasta" onChange={handleChange} />
      <input name="PrecioOfrecido" type="number" step="0.01" onChange={handleChange} />
      <input name="ID_Vehiculo" type="number" onChange={handleChange} />
      <button onClick={publicar}>Publicar</button>
    </div>
  );
}

export default PublicarCarga;
