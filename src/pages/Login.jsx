import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

export default function Login({ setTipoUsuario }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', form);

      // Guardar datos en localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      localStorage.setItem('user_nombre', res.data.nombre);
      localStorage.setItem('user_tipo', res.data.tipo);

      // Actualizar tipo de usuario en estado global
      setTipoUsuario(res.data.tipo);
      // Redireccionar
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">🚪 Iniciar Sesión</h2>

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

        <button className="btn-login" onClick={handleLogin}>Ingresar</button>

        <p className="login-footer">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="registro-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
