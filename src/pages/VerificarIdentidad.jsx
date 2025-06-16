import { useState } from 'react';
import api from '../services/api';
import './VerificarIdentidad.css';
import { useNavigate } from 'react-router-dom';

function VerificarIdentidad() {
  const [documento, setDocumento] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const ID_Usuario = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const irPerfil = () => {
    navigate('/perfil');
  }

  const subir = async () => {
    const form = new FormData();
    form.append('ID_Usuario', ID_Usuario);
    form.append('documento', documento);
    form.append('selfie', selfie);

    try {
      await api.post('/identidad/verificar', form);
      alert('Identidad enviada correctamente');
    } catch (error) {
      alert('Error al enviar identidad');
    }
  };

  return (
    <div className="verificacion-container">
      <div className="verificacion-content">
        <div className="vericiacion-info">
        <h2 className="titulo">🛂 Verificación de Identidad</h2>

        <p className="instrucciones">
          Por favor, sube una imagen clara de tu documento de identidad y una selfie donde lo sostengas junto a tu rostro.
        </p>



        <label>📄 Documento de identidad</label>
        <input type="file" onChange={e => setDocumento(e.target.files[0])} />

        <label>🤳 Selfie con el documento</label>
        <input type="file" onChange={e => setSelfie(e.target.files[0])} />
        <button className="btn-enviar" onClick={subir}>Enviar Verificación</button>
        <button className="btn-volver" onClick={irPerfil}>Volver</button>
      </div>
        
        <div className="imagen-guia">
          <img
            src="https://www.elpais.com.co/resizer/Sbf9dnudkbAHpXxKbo8B1TPrNjA=/arc-anglerfish-arc2-prod-semana/public/4LID3CTAJ5EKLH2LKQPRNZYS2Y.png"
            alt="Ejemplo de selfie con documento"
          />
        </div>
      </div>
    </div>
)}

        export default VerificarIdentidad;