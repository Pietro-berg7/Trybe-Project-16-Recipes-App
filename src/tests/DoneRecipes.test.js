import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const date = new Date();

jest.mock('clipboard-copy');

const lclStrg = [
  {
    key: 'doneRecipes',
    value: [{
      id: 53065,
      category: 'Seafood',
      doneDate: date,
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      name: 'Sushi',
      nationality: 'Japanese',
      tags: ['tag1'],
      type: 'meal',
      alcoholicOrNot: '',
    },
    {
      id: 17837,
      category: 'Ordinary Drink',
      doneDate: date,
      image: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
      name: 'Adam',
      nationality: '',
      tags: ['Alcoholic', 'Holiday'],
      type: 'drink',
      alcoholicOrNot: 'Alcoholic',
    }],
  },
];

describe('Testes de Receitas Feitas', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  const horizontalImage = '0-horizontal-image';
  const horizontalImage2 = '1-horizontal-image';
  const doneRecipes = '/done-recipes';
  const btnAllFilter = 'filter-by-all-btn';
  const btnMealFilter = 'filter-by-meal-btn';
  const btnDrinkFilter = 'filter-by-drink-btn';

  it('Verifica se os componentes são renderizados', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg[0].key, JSON.stringify(lclStrg[0].value));
    act(() => history.push(doneRecipes));

    await waitFor(() => {
      const profile = screen.getByTestId('profile-top-btn');
      const title = screen.getByTestId('page-title');
      const all = screen.getByTestId(btnAllFilter);
      const meal = screen.getByTestId(btnMealFilter);
      const drink = screen.getByTestId(btnDrinkFilter);
      const secondPhoto = screen.getByTestId(horizontalImage2);
      const secondTitle = screen.getByTestId('1-horizontal-name');
      const secondCategory = screen.getByTestId('1-horizontal-top-text');
      const secondShareBtn = screen.getByTestId('1-horizontal-share-btn');
      const tag1 = screen.getByTestId('1-Alcoholic-horizontal-tag');
      const tag2 = screen.getByTestId('1-Holiday-horizontal-tag');

      expect(profile).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(all).toBeInTheDocument();
      expect(meal).toBeInTheDocument();
      expect(drink).toBeInTheDocument();
      expect(secondPhoto).toBeInTheDocument();
      expect(secondTitle).toBeInTheDocument();
      expect(secondCategory).toBeInTheDocument();
      expect(secondShareBtn).toBeInTheDocument();
      expect(tag1).toBeInTheDocument();
      expect(tag2).toBeInTheDocument();
    });
  });

  it('Verifica se os componentes são renderizados', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg[0].key, JSON.stringify(lclStrg[0].value));
    act(() => history.push(doneRecipes));

    await waitFor(() => {
      const tag1 = screen.getByTestId('0-tag1-horizontal-tag');

      expect(tag1).toBeInTheDocument();
    });
  });

  it('Verifica os botões filtrar', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg[0].key, JSON.stringify(lclStrg[0].value));
    act(() => history.push(doneRecipes));

    const filterAll = screen.getByTestId(btnAllFilter);
    const filterMeal = screen.getByTestId(btnMealFilter);
    const filterDrink = screen.getByTestId(btnDrinkFilter);
    const firstPhoto = screen.getByTestId(horizontalImage);
    const secondPhoto = screen.getByTestId(horizontalImage2);

    userEvent.click(filterMeal);
    expect(firstPhoto).toBeInTheDocument();
    expect(secondPhoto).not.toBeInTheDocument();
    userEvent.click(filterAll);

    const newSecondPhoto = screen.getByTestId(horizontalImage2);

    expect(firstPhoto).toBeInTheDocument();
    expect(newSecondPhoto).toBeInTheDocument();
    userEvent.click(filterDrink);

    const newFirstPhoto = screen.getByTestId(horizontalImage);

    expect(newFirstPhoto).toBeInTheDocument();
    expect(newSecondPhoto).not.toBeInTheDocument();
    userEvent.click(newFirstPhoto);
    expect(history.location.pathname).toBe('/drinks/17837');
  });

  it('Verifica se é redirecionado ao clicar na imagem', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg[0].key, JSON.stringify(lclStrg[0].value));
    act(() => history.push(doneRecipes));

    const firstPhoto = screen.getByTestId(horizontalImage);

    userEvent.click(firstPhoto);
    expect(history.location.pathname).toBe('/meals/53065');
  });

  it('Verifica se é redirecionado ao clicar na nome da receita', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg[0].key, JSON.stringify(lclStrg[0].value));
    act(() => history.push(doneRecipes));

    const firstTitle = screen.getByTestId('0-horizontal-name');

    userEvent.click(firstTitle);
    expect(history.location.pathname).toBe('/meals/53065');
  });

  it('Verifica o botão Share', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg[0].key, JSON.stringify(lclStrg[0].value));
    act(() => history.push(doneRecipes));

    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(firstShareBtn);

    const copied = screen.getByText('Link copied!');
    expect(copied).toBeInTheDocument();
  });
});
