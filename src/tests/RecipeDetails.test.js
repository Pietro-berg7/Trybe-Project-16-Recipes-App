import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/meals';
import drinks from './mocks/drinks';

export function mockFetch() {
  return Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(meals),
  });
}

export function mockFetchs() {
  return Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(drinks),
  });
}

jest.mock('clipboard-copy');

describe('Recipe Details Tests', () => {
  const recipeCard = '0-recipe-card';
  const favoriteBtnId = 'favorite-btn';
  const corba = '/meals/52977';

  test('behavior', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId(recipeCard);
      userEvent.click(filterBtn);
    });
    await waitFor(() => {
      const instructions = screen.getByTestId('instructions');
      expect(instructions).toBeInTheDocument();
    });
    const { pathname } = history.location;
    expect(pathname).toBe(corba);
  });

  test('Verifica se ao clicar no botão Start Recipe é redirecionado para RecipesInProgress', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId(recipeCard);
      userEvent.click(filterBtn);
    });

    await waitFor(() => {
      const startBtn = screen.getByTestId('start-recipe-btn');
      expect(startBtn).toBeInTheDocument();
      userEvent.click(startBtn);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977/in-progress');
  });

  test('Testa botão de favoritos', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId(recipeCard);
      userEvent.click(filterBtn);
    });

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(favoriteBtnId);
      expect(favoriteBtn).toBeInTheDocument();
      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    });
  });

  test('Testa a função adicionar e remover favoritos', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    }]));

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId(recipeCard);
      userEvent.click(filterBtn);
    });

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(favoriteBtnId);
      expect(favoriteBtn).toBeInTheDocument();
      userEvent.click(favoriteBtn);
    });

    const newBtnFavorite = screen.getByTestId(favoriteBtnId);
    expect(newBtnFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  test('Testa o botão Share', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52977'));

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('Testa elementos da página meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push(corba));

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      const title = screen.getByTestId('recipe-title');
      const category = screen.getByTestId('recipe-category');
      const video = screen.getByTestId('video');

      expect(photo).toBeInTheDocument();
      expect(title).toHaveTextContent('Corba');
      expect(category).toBeInTheDocument();
      expect(video).toBeInTheDocument();
    });
  });

  test('Testa elementos da página drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchs);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId(recipeCard);
      userEvent.click(filterBtn);
    });

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      const title = screen.getByTestId('recipe-title');
      const category = screen.getByTestId('recipe-category');

      expect(photo).toBeInTheDocument();
      expect(title).toHaveTextContent('GG');
      expect(category).toBeInTheDocument();
    });
  });
});
