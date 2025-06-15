import './Home.css';
import MapaHome from '../components/MapaHome';

function Home() {
  return (
    <div className="home-background">
      <div className='home-layout'>
      <div className="home-container">
        <h1 className="home-title">🚗 Bienvenido a Traveluv</h1>
        <p className="home-subtitle">Tu red social de transporte compartido</p>

        <div className="home-icons">
          <div className="icon-card">
            <span role="img" aria-label="viaje">🧳</span>
            <p>Publica tus viajes</p>
          </div>
          <div className="icon-card">
            <span role="img" aria-label="reserva">📅</span>
            <p>Reserva fácilmente</p>
          </div>
          <div className="icon-card">
            <span role="img" aria-label="valoracion">⭐</span>
            <p>Valora a los usuarios</p>
          </div>
          <div className="icon-card">
            <span role="img" aria-label="verificacion">🛂</span>
            <p>Verifica tu identidad</p>
          </div>
        </div>
        <div className="home-footer">
          <p>🌍 Conectando personas, moviendo destinos.</p>
       <MapaHome />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
