import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import corba from './mocks/corba';
import aquamarine from './mocks/aquamarine';
import spicyArrabiata from './mocks/spicyArrabiata';

const pages = {
  corba: '/meals/52977/in-progress',
  spicyArrabiata: '/meals/52771/in-progress',
  aquamarine: '/drinks/178319/in-progress',
  done: '/done-recipes',
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

const date = new Date();
const locStrg = {
  progKey: 'inProgressRecipes',
  doneKey: 'doneRecipes',
  mealFirst: { meals: { 52771: [] } },
  drinkSecond: {
    meals: {
      52771: [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7',
      ],
    },
    drinks: { 178319: [] },
  },
  drinkThird: {
    meals: {
      52771: [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7',
      ],
    },
    drinks: { 178319: ['0', '1', '2'] },
  },
  mealFourth: {
    meals: {
      52771: [
        '0', '1', '2',
        '3', '4', '5',
        '6', '7',
      ],
      52977: [],
    },
    drinks: { 178319: ['1', '2', '0'] },
  },
  doneIterationOne: [
    {
      id: '52771',
      nationality: 'Italian',
      name: 'Spicy Arrabiata Penne',
      category: 'Vegetarian',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      tags: ['Pasta', 'Curry'],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: date.toISOString(),
    },
  ],
};

jest.mock('clipboard-copy');

describe('Tests the elements displayed at the Recipe In Progress Page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

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

  it('tests the back button', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.aquamarine));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(aquamarine.drinks[0].strDrink);
    });

    const backBtn = screen.getByRole('button', { name: 'Back' });
    act(() => {
      userEvent.click(backBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
  });

  it('Should test the localStorage functionalities', async () => {
    // Need to find a way to mock Date.
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.spicyArrabiata));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    });

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(spicyArrabiata.meals[0].strMeal);
      expect(screen.getByTestId(testIds.finishBtn)).toBeDisabled();
    });

    expect(JSON.parse(localStorage.getItem(locStrg.progKey)))
      .toStrictEqual(locStrg.mealFirst);

    act(() => {
      for (let i = 0; i < 8; i += 1) {
        const ingredientCheck = screen.getByTestId(testIds.ingredient(i));
        expect(ingredientCheck).toBeInTheDocument();

        userEvent.click(ingredientCheck);

        expect(ingredientCheck).toHaveStyle({ textDecoration: 'line-through solid rgb(0, 0, 0)' });
      }

      expect(screen.getByTestId(testIds.finishBtn)).not.toBeDisabled();

      userEvent.click(screen.getByTestId(testIds.finishBtn));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(pages.done);
      // expect(JSON.parse(localStorage.getItem(locStrg.doneKey)))
      //   .toStrictEqual(locStrg.doneIterationOne);
      expect(JSON.parse(localStorage.getItem(locStrg.doneKey)))
        .toHaveLength(locStrg.doneIterationOne.length);
    });

    act(() => history.push(pages.aquamarine));

    await waitFor(() => {
      const locTwo = JSON.parse(localStorage.getItem(locStrg.progKey));
      expect(locTwo).toStrictEqual(locStrg.drinkSecond);
    });

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(aquamarine.drinks[0].strDrink);
      expect(screen.getByTestId(testIds.finishBtn)).toBeDisabled();
    });

    act(() => {
      for (let i = 0; i < 3; i += 1) {
        const ingChk = screen.getByTestId(testIds.ingredient(i));
        expect(ingChk).toBeInTheDocument();

        userEvent.click(ingChk);

        expect(ingChk).toHaveStyle({ textDecoration: 'line-through solid rgb(0, 0, 0)' });
      }

      const finishBtn = screen.getByTestId(testIds.finishBtn);
      expect(finishBtn).not.toBeDisabled();

      userEvent.click(finishBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(pages.done);
      // expect(JSON.parse(localStorage.getItem(locStrg.doneKey)))
      //   .toStrictEqual(locStrg.doneIterationOne);
      expect(JSON.parse(localStorage.getItem(locStrg.doneKey)))
        .toHaveLength(2);
    });

    act(() => history.push(pages.aquamarine));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(aquamarine.drinks[0].strDrink);
      expect(screen.getByTestId(testIds.finishBtn)).not.toBeDisabled();

      const locThree = JSON.parse(localStorage.getItem(locStrg.progKey));
      expect(locThree).toStrictEqual(locStrg.drinkThird);
    });

    act(() => {
      userEvent.click(screen.getByTestId(testIds.ingredient(0)));
    });
    expect(screen.getByTestId(testIds.finishBtn)).toBeDisabled();

    act(() => {
      userEvent.click(screen.getByTestId(testIds.ingredient(0)));
      expect(screen.getByTestId(testIds.finishBtn)).not.toBeDisabled();
      userEvent.click(screen.getByTestId(testIds.finishBtn));
    });

    act(() => history.push(pages.corba));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(corba.meals[0].strMeal);
      expect(screen.getByTestId(testIds.finishBtn)).toBeDisabled();
    });

    const locFour = JSON.parse(localStorage.getItem(locStrg.progKey));
    expect(locFour).toStrictEqual(locStrg.mealFourth);
  });

  it('should test if an error is throw when the page goes to an invalid recipe', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    await waitFor(() => {
      try {
        act(() => history.push('/drinks/99999/in-progress'));
      } catch (e) {
        expect(e.message).toBe('Invalid url');
      }
    });
  });

  it('should test the favorite and share buttons', async () => {
    // This test must be redone after correct implementation of those buttons
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.aquamarine));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.recipeTitle))
        .toHaveTextContent(aquamarine.drinks[0].strDrink);
    });

    act(() => {
      const shareBtn = screen.getByTestId(testIds.shareBtn);
      const favBtn = screen.getByTestId(testIds.favoriteBtn);

      userEvent.click(shareBtn);
      userEvent.click(favBtn);
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
    act(() => history.push(pages.corba));

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(testIds.favoriteBtn);
      expect(favoriteBtn).toBeInTheDocument();
      userEvent.click(favoriteBtn);
    });

    const newBtnFavorite = screen.getByTestId(testIds.favoriteBtn);
    expect(newBtnFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  test('Testa o botão Share', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.corba));

    await waitFor(() => {
      const shareBtn = screen.getByTestId(testIds.shareBtn);
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
