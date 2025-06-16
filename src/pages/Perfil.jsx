import { useEffect, useState } from 'react';
import api from '../services/api';
import './Perfil.css'
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const [perfil, setPerfil] = useState({});
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const irVerificacion = () => {
    navigate('/verificar');
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    if (id) {
      api.get(`/usuarios/${id}`)
        .then(res => {
          setPerfil(res.data);
          setForm({
            nombre: res.data.Nombre,
            email: res.data.Email,
            password: ''
          });
        })
        .catch(err => console.error('ERROR', err));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const guardarCambios = async () => {
    if (!form.nombre || !form.email) return alert('Nombre y correo son obligatorios');

    if (form.password && form.password.length < 6) {
      return alert('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      await api.put(`/usuarios/${id}`, form);
      alert('Datos actualizados correctamente');
      setEditando(false);
    } catch (error) {
      alert('Error al actualizar datos');
    }
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-titulo">👤 Perfil de Usuario</h2>

      {editando ? (
        <div className="perfil-form">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={form.email} type="email" onChange={handleChange} />

          <label>Nueva Contraseña (opcional)</label>
          <input name="password" value={form.password} type="password" onChange={handleChange} />

          <button className="btn-guardar" onClick={guardarCambios}>Guardar</button>
          <button className="btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
        </div>
      ) : (
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {perfil.Nombre}</p>
          <p><strong>Email:</strong> {perfil.Email}</p>
          <button className="btn-editar" onClick={() => setEditando(true)}>Editar Perfil</button>
          <button className="btn-editar" onClick={irVerificacion}>Verificación</button>
        </div>
      )}

      <button className="btn-logout" onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Perfil;