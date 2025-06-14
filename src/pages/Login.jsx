import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', form);

      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      localStorage.setItem('user_nombre', res.data.nombre);
      localStorage.setItem('user_tipo', res.data.tipo);

      window.location.href = '/';
    } catch (error) {
      alert(error.response?.data?.error || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>

      <label>Email</label>
      <input
        name="email"
        type="email"
        placeholder="correo@ejemplo.com"
        onChange={handleChange}
      />

      <label>Contraseña</label>
      <input
        name="password"
        type="password"
        placeholder="********"
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Ingresar</button>

      <p style={{ marginTop: '1rem' }}>
        ¿No tienes una cuenta?{' '}
        <Link to="/registro" style={{ color: '#2563EB', textDecoration: 'underline' }}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
