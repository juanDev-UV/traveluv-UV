import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicarViaje from './pages/PublicarViaje';
import PublicarCarga from './pages/PublicarCarga';
import BuscarViajes from './pages/BuscarViajes';
import BuscarCargas from './pages/BuscarCargas';
import MisReservas from './pages/MisReservas';
import Perfil from './pages/Perfil';
import Valoraciones from './pages/Valoraciones';
import VerificarIdentidad from './pages/VerificarIdentidad';
import "./App.css"
import PrivateRoute from './components/PrivateRoute';
// ...otros imports

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/viajes/publicar"
          element={
            <PrivateRoute>
              <PublicarViaje />
            </PrivateRoute>
          }
        />
        <Route
          path="/cargas/publicar"
          element={
            <PrivateRoute>
              <PublicarCarga />
            </PrivateRoute>
          }
        />
        <Route
          path="/viajes"
          element={
            <PrivateRoute>
              <BuscarViajes />
            </PrivateRoute>
          }
        />
        <Route
          path="/cargas"
          element={
            <PrivateRoute>
              <BuscarCargas />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <MisReservas />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/valoraciones"
          element={
            <PrivateRoute>
              <Valoraciones />
            </PrivateRoute>
          }
        />
        <Route
          path="/verificar"
          element={
            <PrivateRoute>
              <VerificarIdentidad />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App