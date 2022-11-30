import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes', () => {
  test('Rota da pagina de Login', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('redireciona para rota "/meals", após login', () => {
    const { history } = renderWithRouter(<App />);

    const enterBtn = screen.getByTestId('login-submit-btn');

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'mark@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(enterBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
