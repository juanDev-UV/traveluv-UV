import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';
import { MemoryRouter } from 'react-router-dom';
import api from '../services/api';

jest.mock('../services/api');

beforeEach(() => {
  jest.clearAllMocks();
  delete window.location;
  window.location = { href: '' };
});

test('completa y envía el formulario de registro como pasajero', async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
    target: { value: 'Juan Manuel' },
  });
  fireEvent.change(screen.getByPlaceholderText(/correo/i), {
    target: { value: 'juan@correo.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
    target: { value: '123456' },
  });

  fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

  expect(api.post).toHaveBeenCalled(); // verifica que se hizo una petición
});
