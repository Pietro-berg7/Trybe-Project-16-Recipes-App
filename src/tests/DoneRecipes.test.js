import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const date = new Date();

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
      tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      type: 'meal',
      alcoholicOrNot: '',
    },
    {
      id: 52844,
      category: 'Pasta',
      doneDate: date,
      image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
      name: 'Lasagne',
      nationality: 'Italian',
      tags: ['tagLasagne'],
      type: 'meal',
      alcoholicOrNot: '',
    },
    {
      id: 52844,
      category: 'Ordinary Drink',
      doneDate: date,
      image: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
      name: 'Adam',
      nationality: '',
      tags: ['Alcoholic', 'Holiday'],
      type: 'meal',
      alcoholicOrNot: 'Alcoholic',
    }],
  },
];

describe('Testes de Receitas Feitas', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Verifica renderizacao de DoneRecipes', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(lclStrg.key, JSON.stringify(lclStrg.value));
    act(() => history.push('/done-recipes'));
    screen.logTestingPlaygroundURL();
  });
});
