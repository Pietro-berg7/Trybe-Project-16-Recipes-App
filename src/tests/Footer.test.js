import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes do Componente Footer', () => {
  it('Verifica se o componente Footer é renderizado', () => {
    render(<App />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Teste se existem os botões Drink e Meal', () => {
    render(<App />);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const mealButton = screen.getByTestId('meals-bottom-btn');

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
  });

  it('Teste se é possível clicar nos botões', () => {
    render(<App />);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const mealButton = screen.getByTestId('meals-bottom-btn');

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();

    userEvent.click(drinkButton);
    userEvent.click(mealButton);
  });
});
