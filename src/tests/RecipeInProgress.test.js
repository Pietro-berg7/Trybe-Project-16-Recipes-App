import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import corba from './mocks/corba';
import aquamarine from './mocks/aquamarine';

const pages = {
  corba: '/meals/52977/in-progress',
  spicyArrabiata: '/meals/52771/in-progress',
  aquamarine: '/drinks/178319/in-progress',
};

const testIds = {
  recipeTitle: 'recipe-title',
  recipePhoto: 'recipe-photo',
  shareBtn: 'share-btn',
  favoriteBtn: 'favorite-btn',
  recipeCat: 'recipe-category',
  instructions: 'instructions',
  ingredient: (ind) => `${ind}-ingredient-step`,
  finishBtn: 'finish-recipe-btn',
};

describe('Tests the elements displayed at the Recipe In Progress Page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  // afterEach();

  it('Should test if the correct meal elements are being displayed', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.corba));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977');
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Recipe In Progress');

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(corba.meals[0].strMeal);
      expect(screen.getByTestId(testIds.recipePhoto)).toHaveAttribute('src', corba.meals[0].strMealThumb);
      expect(screen.getByTestId(testIds.shareBtn)).toBeInTheDocument();
      expect(screen.getByTestId(testIds.favoriteBtn)).toBeInTheDocument();
      expect(screen.getByTestId(testIds.recipeCat))
        .toHaveTextContent(corba.meals[0].strCategory);
      expect(screen.getByTestId(testIds.instructions))
        .toHaveTextContent(corba.meals[0].strInstructions);
      expect(screen.getByTestId(testIds.finishBtn)).toBeInTheDocument();

      for (let i = 0; i < 13; i += 1) {
        expect(screen.getByTestId(testIds.ingredient(i))).toBeInTheDocument();
      }
    });
  });

  it('Should test if the correct drink elements are being displayed', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.aquamarine));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Recipe In Progress');

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(aquamarine.drinks[0].strDrink);
      expect(screen.getByTestId(testIds.recipePhoto)).toHaveAttribute('src', aquamarine.drinks[0].strDrinkThumb);
      expect(screen.getByTestId(testIds.shareBtn)).toBeInTheDocument();
      expect(screen.getByTestId(testIds.favoriteBtn)).toBeInTheDocument();
      expect(screen.getByTestId(testIds.recipeCat))
        .toHaveTextContent(aquamarine.drinks[0].strCategory);
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(aquamarine.drinks[0].strAlcoholic);
      expect(screen.getByTestId(testIds.instructions))
        .toHaveTextContent(aquamarine.drinks[0].strInstructions);
      expect(screen.getByTestId(testIds.finishBtn)).toBeInTheDocument();

      for (let i = 0; i < 3; i += 1) {
        expect(screen.getByTestId(testIds.ingredient(i))).toBeInTheDocument();
      }
    });
  });
});
