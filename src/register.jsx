import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', tipo: 'pasajero' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    await axios.post('http://localhost:4000/api/auth/register', form);
    alert('Usuario registrado');
  };

  return (
    <div>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <select name="tipo" onChange={handleChange}>
        <option value="pasajero">Pasajero</option>
        <option value="conductor">Conductor</option>
        <option value="remitente">Remitente</option>
      </select>
      <button onClick={register}>Registrar</button>
    </div>
  );
}
