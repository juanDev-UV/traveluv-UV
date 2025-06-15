import { useEffect, useState } from 'react';
import api from '../services/api';
import './Vehiculo.css';

function Vehiculo() {
    const tipo = localStorage.getItem('user_tipo');
    const id_usuario = localStorage.getItem('user_id');

    const [vehiculo, setVehiculo] = useState(null);
    const [form, setForm] = useState({ marca: '', modelo: '', matricula: '', capacidadAsientos: '', capacidadCarga: '' });
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        if (tipo !== 'conductor') {
            alert('Solo los conductores pueden acceder a esta sección.');
            window.location.href = '/';
        } else {
            cargarVehiculo();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cargarVehiculo = async () => {
        try {
            const res = await api.get(`/vehiculos/usuario/${id_usuario}`);
            if (res.data) {
                setVehiculo(res.data);
                setForm({
                    marca: res.data.Marca,
                    modelo: res.data.Modelo,
                    matricula: res.data.Matricula,
                    capacidadAsientos: res.data.CapacidadAsientos,
                    capacidadCarga: res.data.CapacidadCarga
                });
                setModoEdicion(false);
            }
        } catch (err) {
            setVehiculo(null);
            setModoEdicion(true);
        }
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const guardarVehiculo = async () => {
        try {
            await api.post('/vehiculos/registrar', { ...form, ID_Usuario: id_usuario });
            alert('Vehículo guardado exitosamente');
            cargarVehiculo();
        } catch (err) {
            alert('Error al guardar vehículo');
        }
    };

    return (
        <div className="vehiculo-container">
            <h2 className="vehiculo-titulo">🚗 Gestión de Vehículo</h2>

            {vehiculo && !modoEdicion ? (
                <div className="vehiculo-info">
                    <p><strong>Marca:</strong> {vehiculo.Marca}</p>
                    <p><strong>Modelo:</strong> {vehiculo.Modelo}</p>
                    <p><strong>Matrícula:</strong> {vehiculo.Matricula}</p>
                    <p><strong>Capacidad Asientos:</strong> {vehiculo.CapacidadAsientos}</p>
                    <p><strong>Capacidad Carga:</strong> {vehiculo.CapacidadCarga} kg</p>
                    <button onClick={() => setModoEdicion(true)} className="btn-editar">Editar</button>
                </div>
            ) : (
                <div className="vehiculo-form">
                    <label>Marca</label>
                    <input name="marca" value={form.marca} onChange={handleChange} />

                    <label>Modelo</label>
                    <input name="modelo" value={form.modelo} onChange={handleChange} />

                    <label>Matrícula</label>
                    <input name="matricula" value={form.matricula} onChange={handleChange} />

                    <label>Capacidad de Asientos</label>
                    <input name="capacidadAsientos" type="number" value={form.capacidadAsientos} onChange={handleChange} />

                    <label>Capacidad de Carga (kg)</label>
                    <input name="capacidadCarga" type="number" value={form.capacidadCarga} onChange={handleChange} />

                    <button className="btn-guardar" onClick={guardarVehiculo}>Guardar Vehículo</button>
                </div>
            )}
        </div>
    );
}

export default Vehiculo;
