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

describe('Recipe Details Tests', () => {
  test('behavior', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    await waitFor(() => {
      const filterBtn = screen.getByTestId('0-recipe-card');
      userEvent.click(filterBtn);
    });
    await waitFor(() => {
      const instructions = screen.getByTestId('instructions');
      expect(instructions).toBeInTheDocument();
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });
});
