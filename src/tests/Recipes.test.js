import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import beefMeals from './mocks/beefMeals';

const pages = {
  meals: '/meals',
  drinks: '/drinks',
};

const testIds = {
  footer: 'footer',
};

const mealNames = meals.meals.map((m) => ({ strMeal: m.strMeal }));
const mealCategories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const beefMealsNames = beefMeals.meals.map((bm) => bm.strMeal);
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

      expect(screen.getByTestId('All-category-filter')).toHaveTextContent('All');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should test if the category buttons are filtering the recipes and working as toggles', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.meals));

    await waitFor(() => {
      for (let i = 0; i < 12; i += 1) {
        expect(screen.getByTestId(`${i}-recipe-card`))
          .toHaveTextContent(mealNames[i].strMeal);
      }
    });

    const beefCategoryBtn = screen.getByRole('button', { name: 'Beef' });

    act(() => userEvent.click(beefCategoryBtn));

    await waitFor(() => {
      for (let i = 0; i < 12; i += 1) {
        expect(screen.getByTestId(`${i}-recipe-card`))
          .toHaveTextContent(beefMealsNames[i]);
      }
    });

    act(() => userEvent.click(beefCategoryBtn));

    await waitFor(() => {
      for (let j = 0; j < 12; j += 1) {
        expect(screen.getByTestId(`${j}-recipe-card`))
          .toHaveTextContent(mealNames[j].strMeal);
      }
    });

    const allCatBtn = screen.getByRole('button', { name: 'All' });
    act(() => {
      userEvent.click(beefCategoryBtn);
      userEvent.click(allCatBtn);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

      for (let j = 0; j < 12; j += 1) {
        expect(screen.getByTestId(`${j}-recipe-card`))
          .toHaveTextContent(mealNames[j].strMeal);
      }
    });
  });

  it('Should test if the recipe card redirects the user to its details page', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.meals));

    await waitFor(() => {
      expect(screen.getByText('Corba')).toBeInTheDocument();
    });

    const corbaCard = screen.getByTestId('0-recipe-card');
    expect(corbaCard).toHaveTextContent('Corba');

    act(() => {
      userEvent.click(corbaCard);

      expect(history.location.pathname).toBe('/meals/52977');
    });
  });
});
