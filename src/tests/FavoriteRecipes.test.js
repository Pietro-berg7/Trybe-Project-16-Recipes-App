import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

jest.mock('clipboard-copy');

const mock = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
];

describe('Verificando a page RecipeDetails', () => {
  it('Verifica se os componentes são renderizados quando não há favoritos', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    await waitFor(() => {
      const profile = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const all = screen.getByTestId('filter-by-all-btn');
      const food = screen.getByTestId('filter-by-meal-btn');
      const drink = screen.getByTestId('filter-by-drink-btn');

      expect(profile).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(all).toBeInTheDocument();
      expect(food).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
    });
  });

  it('Verifica se os componentes são renderizados quando há favoritos', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    await waitFor(() => {
      const profile = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const all = screen.getByTestId('filter-by-all-btn');
      const food = screen.getByTestId('filter-by-meal-btn');
      const drink = screen.getByTestId('filter-by-drink-btn');
      const firstPhoto = screen.getByTestId('0-horizontal-image');
      const firstTitle = screen.getByTestId('0-horizontal-name');
      const firstCategory = screen.getByTestId('0-horizontal-top-text');
      const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
      const firstFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

      expect(profile).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(all).toBeInTheDocument();
      expect(food).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
      expect(firstPhoto).toBeInTheDocument();
      expect(firstTitle).toBeInTheDocument();
      expect(firstCategory).toBeInTheDocument();
      expect(firstShareBtn).toBeInTheDocument();
      expect(firstFavoriteBtn).toBeInTheDocument();
    });
  });

  it('Verifica os botões filtrar', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterFood = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    const firstPhoto = screen.getByTestId('0-horizontal-image');
    const secondPhoto = screen.getByTestId('1-horizontal-image');

    userEvent.click(filterFood);
    expect(firstPhoto).toBeInTheDocument();
    expect(secondPhoto).not.toBeInTheDocument();
    userEvent.click(filterAll);

    const newSecondPhoto = screen.getByTestId('1-horizontal-image');

    expect(firstPhoto).toBeInTheDocument();
    expect(newSecondPhoto).toBeInTheDocument();
    userEvent.click(filterDrink);

    const newFirstPhoto = screen.getByTestId('0-horizontal-image');

    expect(newFirstPhoto).toBeInTheDocument();
    expect(newSecondPhoto).not.toBeInTheDocument();
    userEvent.click(newFirstPhoto);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Verifica se é redirecionado ao clicar na imagem', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    const firstPhoto = screen.getByTestId('0-horizontal-image');

    userEvent.click(firstPhoto);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Verifica se é redirecionado ao clicar na nome da receita', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    const firstTitle = screen.getByTestId('0-horizontal-name');

    userEvent.click(firstTitle);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Verifica os botões Share e Favorite', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const firstFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(firstShareBtn);
    const copied = screen.getByText('Link copied!');
    expect(copied).toBeInTheDocument();

    userEvent.click(firstFavoriteBtn);
    expect(firstFavoriteBtn).not.toBeInTheDocument();
  });
});
