import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'pasajero'
  });
  const [foto, setFoto] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => setFoto(e.target.files[0]);


  const handleRegister = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (foto) data.append('foto', foto);

    try {
      await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Usuario registrado con éxito');
      window.location.href = '/login';
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">📝 Registro</h2>

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
        </select>

        <label>Foto de perfil (opcional)</label>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />

        <button className="btn-login" onClick={handleRegister}>Registrar</button>

        <p className="login-footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="registro-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;