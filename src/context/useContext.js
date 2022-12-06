import React, { createContext, useMemo, useState } from 'react';
import { node } from 'prop-types';

export const Context = createContext();

export default function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState('meals');
  const [categories, setCategories] = useState([]);

  function setApiUrl(route) {
    switch (route) {
    case 'meals':
      return 'https://www.themealdb.com/api/json/v1/1/';
    case 'drinks':
      return 'https://www.thecocktaildb.com/api/json/v1/1/';
    default:
      return 'https://www.themealdb.com/api/json/v1/1/';
    }
  }

  async function fetchRecipes({ ingredient, recipeName, firstLetter }, route) {
    try {
      const URL = setApiUrl(route);
      let complement = 'search.php?s=';
      if (ingredient) complement = `filter.php?c=${ingredient}`;
      if (recipeName) complement = `search.php?s=${recipeName}`;
      if (firstLetter) complement = `search.php?f=${firstLetter}`;

      const response = await fetch(`${URL}${complement}`);
      const recipesAPI = await response.json();
      setRecipes(recipesAPI[route]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCategories(route) {
    const maximumCategories = 5;
    try {
      const type = route === 'drinks' ? 'thecocktaildb' : 'themealdb';
      const URL = `https://www.${type}.com/api/json/v1/1/list.php?c=list`;

      const response = await fetch(URL);
      const cat = await response.json();
      const catList = cat[route].slice(0, maximumCategories).map((c) => c.strCategory);
      setCategories(catList);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchRecipeId(route) {
    try {
      const type = route.includes('drinks') ? 'thecocktaildb' : 'themealdb';
      const id = route.split('/').pop();
      const URL = `https://www.${type}.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(URL);
      const data = await response.json();
      if (route.includes('drinks')) {
        return data.drinks[0];
      }
      return data.meals[0];
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchRecipeRecommendations(route) {
    try {
      const SIX = 6;
      const type = route.includes('meals') ? 'thecocktaildb' : 'themealdb';
      const URL = `https://www.${type}.com/api/json/v1/1/search.php?s=`;

      const response = await fetch(URL);
      const data = await response.json();

      if (route.includes('drinks')) {
        return data.meals.slice(0, SIX);
      }
      return data.drinks.slice(0, SIX);
    } catch (e) {
      console.error(e);
    }
  }

  const values = useMemo(() => ({
    recipes,
    recipeType,
    categories,
    fetchRecipes,
    setRecipeType,
    fetchCategories,
    fetchRecipeId,
    fetchRecipeRecommendations,
  }), [recipes, recipeType, categories]);

  return (
    <Context.Provider value={ values }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;
