import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import api from '../services/api';

jest.mock('../services/api'); // mockear la API

test('guarda datos en localStorage al hacer login exitoso', async () => {
  const fakeUser = {
    token: 'fake-token',
    id: '123',
    nombre: 'Juan',
    tipo: 'cliente',
  };

  api.post.mockResolvedValue({ data: fakeUser });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), {
    target: { value: 'juan@mail.com', name: 'email' },
  });

  fireEvent.change(screen.getByPlaceholderText(/^\*+$/), {
    target: { value: '1234', name: 'password' },
  });

  fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(localStorage.getItem('user_nombre')).toBe('Juan');
  });
});
