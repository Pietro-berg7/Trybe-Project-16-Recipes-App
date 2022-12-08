import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './mocks/mockFetch';

const openSearchId = 'search-top-btn';
const searchBtnId = 'exec-search-btn';
const searchInputId = 'search-input';

describe('Testa funcionamento de Searchbar', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Testa busca de receita por ingrediente', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    userEvent.click(screen.getByTestId(openSearchId));
    userEvent.type(screen.getByTestId(searchInputId), 'chicken');
    userEvent.click(screen.getByTestId(searchBtnId));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'));
    expect(await screen.findByTestId('10-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('10-recipe-card')).toHaveTextContent(/thai green curry/i);
    screen.logTestingPlaygroundURL();
  });

  test('Verifica erro ao buscar primeira letra com multiplas letras', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    userEvent.click(screen.getByTestId(openSearchId));
    userEvent.type(screen.getByTestId(searchInputId), 'la');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(searchBtnId));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
});
