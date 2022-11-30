import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

const drinkBtn = 'drinks-bottom-btn';
const mealBtn = 'meals-bottom-btn';

describe('Testes do Componente Footer', () => {
  it('Verifica se o componente Footer é renderizado', () => {
    renderPath('/meals');

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Teste se existem os botões Drink e Meal', () => {
    renderPath('/meals');

    const drinkButton = screen.getByTestId(drinkBtn);
    const mealButton = screen.getByTestId(mealBtn);

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
  });
});

describe('Testes dos botões do Componente Footer', () => {
  it('Teste se é possível clicar nos botões', () => {
    renderPath('/meals');

    const drinkButton = screen.getByTestId(drinkBtn);
    const mealButton = screen.getByTestId(mealBtn);

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();

    userEvent.click(drinkButton);
    userEvent.click(mealButton);
  });

  it('Teste se ao clicar no botão Drinks, a página de drinks é renderizada', async () => {
    const { history } = renderPath('/meals');

    const drinkButton = screen.getByTestId(drinkBtn);

    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
  });

  it('Teste se ao clicar no botão Meals, a página de comidas é renderizada', async () => {
    const { history } = renderPath('/drinks');

    const mealButton = screen.getByTestId(mealBtn);

    expect(mealButton).toBeInTheDocument();

    userEvent.click(mealButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
