import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import api from '../services/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px',
  marginTop: '1.5rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
};

const center = {
  lat: 4.5709, // Centro de Colombia
  lng: -74.2973
};

function MapaHome() {
  const [viajes, setViajes] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  useEffect(() => {
    api.get('/viajes/proximos')
      .then(res => setViajes(res.data))
      .catch(err => console.error('Error al obtener viajes:', err));
  }, []);

  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <div className="mapa-home">
      <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>🗺️ Próximos Viajes</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
      >
        {viajes.map((v, i) => (
          <Marker
            key={i}
            position={{ lat: parseFloat(v.lat), lng: parseFloat(v.lng) }}
            label={`${v.Origen} → ${v.Destino}`.slice(0, 20)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapaHome;
