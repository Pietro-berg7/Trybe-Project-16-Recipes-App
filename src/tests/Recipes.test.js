import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Tests the display of the Recipes Page', () => {
  it.todo('Should test if the correct elements are displayed');
  it.todo('Should test if the recipes displayed are displayed according to the pathname');
  it.todo('Should test if the correct categories are displayed according to the pathname');
});

describe('Tests the functionality of the page', () => {
  it.todo('Should test if only 12 maximum recipes are displayed in the screen');
  it.todo('Should test if the category buttons are filtering the recipes');
  it.todo('Should test if the category buttons work as toggles');
  it.todo('Should test if recipe redirects the user to its details page');
});
