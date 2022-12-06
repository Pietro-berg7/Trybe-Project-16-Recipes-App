import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const testIds = {
  mail: 'profile-email',
  doneBtn: 'profile-done-btn',
  favBtn: 'profile-favorite-btn',
  logoutBtn: 'profile-logout-btn',
};

const paths = {
  profile: '/profile',
  done: '/done-recipes',
  favorites: '/favorite-recipes',
  login: '/',
};

const testEmail = 'tryber@test.com';
const locStKey = 'user';

describe('Tests the Profile Page', () => {
  it('Should test if the correct elements are displayed', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(locStKey, JSON.stringify({ email: testEmail }));
    act(() => history.push(paths.profile));

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Profile');
    });

    expect(screen.getByTestId(testIds.mail)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.doneBtn)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.favBtn)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.logoutBtn)).toBeInTheDocument();
  });

  it('Should test if the email is recovered from the local storage', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(locStKey, JSON.stringify({ email: testEmail }));
    act(() => history.push(paths.profile));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.mail)).toHaveTextContent(testEmail);
    });
  });

  it('Should test if the Done Recipes button redirects to the correct page', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(locStKey, JSON.stringify({ email: testEmail }));
    act(() => history.push(paths.profile));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.doneBtn)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId(testIds.doneBtn));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(paths.done);
    });
  });
  it('Should test if the Favorite Recipes button redirects to the corect page', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(locStKey, JSON.stringify({ email: testEmail }));
    act(() => history.push(paths.profile));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.favBtn)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId(testIds.favBtn));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(paths.favorites);
    });
  });

  it('Should test if the Logout button works properly', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem(locStKey, JSON.stringify({ email: testEmail }));
    act(() => history.push(paths.profile));

    await waitFor(() => {
      expect(screen.getByTestId(testIds.mail)).toHaveTextContent(testEmail);
    });

    act(() => {
      userEvent.click(screen.getByTestId(testIds.logoutBtn));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(paths.login);
      expect(localStorage.getItem(locStKey)).toBeNull();
    });
  });
});
