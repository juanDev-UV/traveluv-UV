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

  // Campos del vehículo
  const [vehiculo, setVehiculo] = useState({
    marca: '',
    modelo: '',
    matricula: '',
    capacidadAsientos: '',
    capacidadCarga: ''
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => setFoto(e.target.files[0]);

  const handleVehiculoChange = e =>
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (foto) data.append('foto', foto);

    if (form.tipo === 'conductor') {
      Object.entries(vehiculo).forEach(([key, value]) => {
        data.append(key, value);
      });
    }

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
          <option value="remitente">Remitente</option>
        </select>

        <label>Foto de perfil (opcional)</label>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />

        {form.tipo === 'conductor' && (
          <div className="vehiculo-section">
            <h3>🚗 Datos del Vehículo</h3>

            <label>Marca</label>
            <input name="marca" onChange={handleVehiculoChange} />

            <label>Modelo</label>
            <input name="modelo" onChange={handleVehiculoChange} />

            <label>Matrícula</label>
            <input name="matricula" onChange={handleVehiculoChange} />

            <label>Capacidad de Asientos</label>
            <input name="capacidadAsientos" type="number" onChange={handleVehiculoChange} />

            <label>Capacidad de Carga (kg)</label>
            <input name="capacidadCarga" type="number" onChange={handleVehiculoChange} />
          </div>
        )}

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