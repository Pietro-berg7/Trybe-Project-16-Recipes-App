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
  const horizontalImage = '0-horizontal-image';
  const favoriteRecipes = '/favorite-recipes';
  const btnAllFilter = 'filter-by-all-btn';
  const btnMealFilter = 'filter-by-meal-btn';
  const btnDrinkFilter = 'filter-by-drink-btn';

  it('Verifica se os componentes são renderizados quando não há favoritos', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    await waitFor(() => {
      const profile = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const all = screen.getByTestId(btnAllFilter);
      const meal = screen.getByTestId(btnMealFilter);
      const drink = screen.getByTestId(btnDrinkFilter);

      expect(profile).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(all).toBeInTheDocument();
      expect(meal).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
    });
  });

  it('Verifica se os componentes são renderizados quando há favoritos', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    await waitFor(() => {
      const profile = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const all = screen.getByTestId(btnAllFilter);
      const meal = screen.getByTestId(btnMealFilter);
      const drink = screen.getByTestId(btnDrinkFilter);
      const firstPhoto = screen.getByTestId(horizontalImage);
      const firstTitle = screen.getByTestId('0-horizontal-name');
      const firstCategory = screen.getByTestId('0-horizontal-top-text');
      const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
      const firstFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

      expect(profile).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(all).toBeInTheDocument();
      expect(meal).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
      expect(firstPhoto).toBeInTheDocument();
      expect(firstTitle).toBeInTheDocument();
      expect(firstCategory).toBeInTheDocument();
      expect(firstShareBtn).toBeInTheDocument();
      expect(firstFavoriteBtn).toBeInTheDocument();
    });
  });

  it('Verifica os botões filtrar', () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const filterAll = screen.getByTestId(btnAllFilter);
    const filterMeal = screen.getByTestId(btnMealFilter);
    const filterDrink = screen.getByTestId(btnDrinkFilter);
    const firstPhoto = screen.getByTestId(horizontalImage);
    const secondPhoto = screen.getByTestId('1-horizontal-image');

    userEvent.click(filterMeal);
    expect(firstPhoto).toBeInTheDocument();
    expect(secondPhoto).not.toBeInTheDocument();
    userEvent.click(filterAll);

    const newSecondPhoto = screen.getByTestId('1-horizontal-image');

    expect(firstPhoto).toBeInTheDocument();
    expect(newSecondPhoto).toBeInTheDocument();
    userEvent.click(filterDrink);

    const newFirstPhoto = screen.getByTestId(horizontalImage);

    expect(newFirstPhoto).toBeInTheDocument();
    expect(newSecondPhoto).not.toBeInTheDocument();
    userEvent.click(newFirstPhoto);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Verifica se é redirecionado ao clicar na imagem', () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const firstPhoto = screen.getByTestId(horizontalImage);

    userEvent.click(firstPhoto);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Verifica se é redirecionado ao clicar na nome da receita', () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const firstTitle = screen.getByTestId('0-horizontal-name');

    userEvent.click(firstTitle);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Verifica os botões Share e Favorite', () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(favoriteRecipes));

    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const firstFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(firstShareBtn);
    const copied = screen.getByText('Link copied!');
    expect(copied).toBeInTheDocument();

    userEvent.click(firstFavoriteBtn);
    expect(firstFavoriteBtn).not.toBeInTheDocument();
  });
});
