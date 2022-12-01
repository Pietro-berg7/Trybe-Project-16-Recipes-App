import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import meals from './mocks/meals';
import drinks from './mocks/drinks';

const pages = {
  meals: '/meals',
  drinks: '/drinks',
};

const testIds = {
  footer: 'footer',
};

const mealNames = meals.meals.map((m) => ({ strMeal: m.strMeal }));
const mealCategories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const drinkNames = drinks.drinks.map((d) => ({ strDrink: d.strDrink }));
const drinkCategories = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

describe('Tests the display of the Recipes Page', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should test if the correct elements are displayed', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Meals');
    expect(screen.getByTestId(testIds.footer)).toBeInTheDocument();

    act(() => history.push('/drinks'));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Drinks');
  });

  it('Should test if the recipes and categories are displayed according to the pathname', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.meals));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

      for (let i = 0; i < 12; i += 1) {
        expect(screen.getByTestId(`${i}-recipe-card`))
          .toHaveTextContent(mealNames[i].strMeal);
      }

      for (let c = 0; c < 5; c += 1) {
        expect(screen.getByTestId(`${mealCategories[c]}-category-filter`))
          .toBeInTheDocument();
      }
    });

    act(() => history.push(pages.drinks));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

      for (let j = 0; j < 12; j += 1) {
        expect(screen.getByTestId(`${j}-recipe-card`))
          .toHaveTextContent(drinkNames[j].strDrink);
      }

      for (let c = 0; c < 5; c += 1) {
        expect(screen.getByTestId(`${drinkCategories[c]}-category-filter`))
          .toBeInTheDocument();
      }
    });
  });
});

describe('Tests the functionality of the page', () => {
  it.todo('Should test if only 12 maximum recipes are displayed in the screen');
  it.todo('Should test if the category buttons are filtering the recipes');
  it.todo('Should test if the category buttons work as toggles');
  it.todo('Should test if recipe redirects the user to its details page');
});
