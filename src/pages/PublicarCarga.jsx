import { useState } from 'react';
import api from '../services/api';

function PublicarCarga() {
  const [form, setForm] = useState({
    Peso: '', Dimensiones: '', Fragil: '', UbicacionRecogida: '', UbicacionEntrega: '', PrecioOfrecido: '', ID_Vehiculo: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const publicar = async () => {
    await api.post('/cargas/crear', form);
    alert('Carga publicada');
  };

  return (
    <div className='container'>
      <h2>Publicar Carga</h2>
      <input name="Peso" onChange={handleChange} />
      <input name="Dimensiones" onChange={handleChange} />
      <input name="Fragil" onChange={handleChange} />
      <input name="UbicacionRecogida" onChange={handleChange} />
      <input name="UbicacionEntrega" onChange={handleChange} />
      <input name="PrecioOfrecido" onChange={handleChange} />
      <input name="ID_Vehiculo" onChange={handleChange} />
      <button onClick={publicar}>Publicar</button>
    </div>
  );
}

export default PublicarCarga