import { useState } from 'react';
import api from '../services/api';

function VerificarIdentidad() {
  const [documento, setDocumento] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const ID_Usuario = localStorage.getItem('user_id');

  const subir = async () => {
    const form = new FormData();
    form.append('ID_Usuario', ID_Usuario);
    form.append('documento', documento);
    form.append('selfie', selfie);

    await api.post('/identidad/verificar', form);
    alert('Identidad enviada');
  };

  return (
    <div className='container'>
      <h2>Verificación de Identidad</h2>
      <input type="file" onChange={e => setDocumento(e.target.files[0])} />
      <input type="file" onChange={e => setSelfie(e.target.files[0])} />
      <button onClick={subir}>Enviar</button>
    </div>
  );
}


export default VerificarIdentidad