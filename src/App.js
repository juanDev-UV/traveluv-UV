import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicarViaje from './pages/PublicarViaje';
import PublicarCarga from './pages/PublicarCarga';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/viajes/publicar" element={<PublicarViaje />} />
        <Route path="/cargas/publicar" element={<PublicarCarga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
