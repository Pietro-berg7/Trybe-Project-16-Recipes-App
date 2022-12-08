import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/meals';

export default function mockFetch() {
  return Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(meals)
    ,
  });
}

jest.mock('clipboard-copy');

describe('Recipe Details Tests', () => {
  const recipeCard = '0-recipe-card';
  const favoriteBtnId = 'favorite-btn';

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
    expect(pathname).toBe('/meals/52977');
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

  test('Testa elementos da página', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId(recipeCard);
      userEvent.click(filterBtn);
    });

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      const title = screen.getByTestId('recipe-title');
      const category = screen.getByTestId('recipe-category');
      const video = screen.getByTestId('video');
      const button = screen.getByTestId('start-recipe-btn');

      expect(photo).toBeInTheDocument();
      expect(title).toHaveTextContent('Corba');
      expect(category).toBeInTheDocument();
      expect(video).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  // test('Testa recomendações', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  //   const { history } = renderWithRouter(<App />);
  //   act(() => history.push('/meals/52977'));

  //   expect(screen.getByTestId('0-recommendation-title')).toBeInTheDocument();
  // });
});
