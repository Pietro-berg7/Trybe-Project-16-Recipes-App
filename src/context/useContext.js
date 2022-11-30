import React, { createContext, useMemo, useState } from 'react';
import { node } from 'prop-types';

export const Context = createContext();

export default function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState('meals');

  function setApiUrl() {
    switch (recipeType) {
    case 'meals':
      return 'https://www.themealdb.com/api/json/v1/1/';
    case 'drinks':
      return 'https://www.thecocktaildb.com/api/json/v1/1/';
    default:
      return 'https://www.themealdb.com/api/json/v1/1/';
    }
  }

  async function fetchRecipes({ ingredient, recipeName, firstLetter }) {
    try {
      const URL = setApiUrl();
      let complement = 'search.php?s=';
      if (ingredient) complement = `filter.php?i=${ingredient}`;
      if (recipeName) complement = `search.php?s=${recipeName}`;
      if (firstLetter) complement = `search.php?f=${firstLetter}`;
      console.log(`${URL}${complement}`);

      const response = await fetch(`${URL}${complement}`);
      const recipesAPI = await response.json();
      setRecipes(recipesAPI[recipeType]);
    } catch (error) {
      console.error(error);
    }
  }

  const values = useMemo(() => ({
    recipes,
    recipeType,
    fetchRecipes,
    setRecipeType,
  }), [recipes, recipeType]);

  return (
    <Context.Provider value={ values }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;
