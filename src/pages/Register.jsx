import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'pasajero',
    foto: '' // nuevo campo opcional
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', form);
      alert('Usuario registrado con éxito');
      window.location.href = '/login';
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>

      <label>Nombre</label>
      <input name="nombre" placeholder="Nombre completo" onChange={handleChange} />

      <label>Email</label>
      <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} />

      <label>Contraseña</label>
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />

      <label>Tipo de usuario</label>
      <select name="tipo" onChange={handleChange}>
        <option value="pasajero">Pasajero</option>
        <option value="conductor">Conductor</option>
        <option value="remitente">Remitente</option>
      </select>

      <label>Foto (URL)</label>
      <input name="foto" placeholder="https://..." onChange={handleChange} />

      <button onClick={handleRegister}>Registrar</button>

      <p style={{ marginTop: '1rem' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#2563EB', textDecoration: 'underline' }}>
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default Register;
