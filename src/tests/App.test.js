import React from 'react';
// import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('Rota da pagina de Login', () => {
  const { history } = renderWithRouter(<App />);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
