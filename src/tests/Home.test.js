import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';

test('renderiza el título y los íconos principales en Home', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText(/bienvenido a traveluv/i)).toBeInTheDocument();
  expect(screen.getByText(/tu red social de transporte compartido/i)).toBeInTheDocument();

  expect(screen.getByText(/publica tus viajes/i)).toBeInTheDocument();
  expect(screen.getByText(/reserva fácilmente/i)).toBeInTheDocument();
  expect(screen.getByText(/valora a los usuarios/i)).toBeInTheDocument();
  expect(screen.getByText(/verifica tu identidad/i)).toBeInTheDocument();
});
