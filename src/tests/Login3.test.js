import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { MemoryRouter } from 'react-router-dom';
import api from '../services/api';

jest.mock('../services/api');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  window.alert = jest.fn(); // ⛔ mock de alert para evitar error
});

test('no guarda datos en localStorage si las credenciales fallan', async () => {
  // Simular error de API
  api.post.mockRejectedValueOnce({
    response: { data: { error: 'Credenciales inválidas' } },
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.com'), {
    target: { value: 'incorrecto@example.com' },
  });

  fireEvent.change(screen.getByPlaceholderText('********'), {
    target: { value: 'claveincorrecta' },
  });

  fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

  // Esperar a que alert haya sido llamado
  await screen.findByRole('button'); // forzar render async

  expect(window.alert).toHaveBeenCalledWith('Credenciales inválidas');

  // Verifica que no se haya guardado el token
  expect(localStorage.getItem('token')).toBeNull();
});
