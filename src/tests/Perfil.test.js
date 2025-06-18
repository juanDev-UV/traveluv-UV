import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Perfil from '../pages/Perfil';
import { BrowserRouter } from 'react-router-dom';
import api from '../services/api';

// Mock de la API
jest.mock('../services/api', () => ({
  get: jest.fn(),
  put: jest.fn()
}));

describe('Perfil', () => {
  beforeEach(() => {
    // Simula que el usuario ya está logueado
    localStorage.setItem('user_id', '123');

    api.get.mockResolvedValue({
      data: {
        Nombre: 'Juan Test',
        Email: 'juan@test.com'
      }
    });

    api.put.mockResolvedValue({});
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('permite editar y guardar cambios en el perfil', async () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    // Esperar a que cargue la info del usuario
    await screen.findByText(/juan@test.com/i);

    fireEvent.click(screen.getByRole('button', { name: /editar perfil/i }));

    // Obtener los inputs por su orden
    const inputs = screen.getAllByRole('textbox'); // nombre, email
    fireEvent.change(inputs[0], { target: { value: 'Nuevo Nombre' } });
    fireEvent.change(inputs[1], { target: { value: 'nuevo@email.com' } });

    // Contraseña es type=password, no entra en getAllByRole('textbox')
    const passwordInput = screen.getByDisplayValue('');
    fireEvent.change(passwordInput, { target: { value: 'nueva123' } });

    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/usuarios/123', {
        nombre: 'Nuevo Nombre',
        email: 'nuevo@email.com',
        password: 'nueva123'
      });
    });
  });
});
