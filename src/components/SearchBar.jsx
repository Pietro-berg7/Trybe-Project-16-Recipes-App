/* eslint-disable react/jsx-no-bind */
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../context/useContext';
import { SeachButton, SearchOptions, Button } from './CSS/Header.styled';

export default function SearchBar() {
  const { fetchRecipes } = useContext(Context);
  const { pathname } = useLocation();
  const [formData, setFormData] = useState({
    searchInput: '',
    searchType: 'ingredient',
  });
  const [available, setAvailable] = useState(false);

  function handleInput({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function searchRecipes() {
    const { searchType, searchInput } = formData;
    if (searchType === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    fetchRecipes({ [searchType]: searchInput }, pathname.replace('/', ''));
  }

  return (
    <div>
      <SeachButton
        type="search"
        data-testid="search-input"
        name="searchInput"
        value={ formData.searchInput }
        onChange={ handleInput }
        onClick={ () => setAvailable(!available) }
        placeholder="Seach"
      />
      {available && (
        <>
          <SearchOptions>
            <label htmlFor="ingredient-search-radio">
              <input
                type="radio"
                name="searchType"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                value="ingredient"
                onChange={ handleInput }
                checked={ formData.searchType === 'ingredient' }
              />
              Ingredient
            </label>
            <label htmlFor="name-search-radio">
              <input
                type="radio"
                name="searchType"
                id="name-search-radio"
                data-testid="name-search-radio"
                value="recipeName"
                onChange={ handleInput }
                checked={ formData.searchType === 'recipeName' }
              />
              Name
            </label>
            <label htmlFor="first-letter-search-radio">
              <input
                type="radio"
                name="searchType"
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                value="firstLetter"
                onChange={ handleInput }
                checked={ formData.searchType === 'firstLetter' }
              />
              First letter
            </label>
          </SearchOptions>
          <Button
            type="button"
            data-testid="exec-search-btn"
            onClick={ searchRecipes }
          >
            Search
          </Button>
        </>

      )}
    </div>
  );
}
