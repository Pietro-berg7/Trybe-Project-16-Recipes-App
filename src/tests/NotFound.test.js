import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Recipe Details Tests', () => {
  test('behavior', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/2938r29r9uj908'));

    await waitFor(() => {
      const notFound = screen.getByText('Page Not Found');
      expect(notFound).toBeInTheDocument();
    });
  });
});
