import React, { createContext, useMemo, useState } from 'react';
import { node } from 'prop-types';
import { useHistory } from 'react-router-dom';

export const Context = createContext();

export default function Provider({ children }) {
  const history = useHistory();
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
      if (ingredient) complement = `filter.php?i=${ingredient}`;
      if (recipeName) complement = `search.php?s=${recipeName}`;
      if (firstLetter) complement = `search.php?f=${firstLetter}`;

      const response = await fetch(`${URL}${complement}`);
      const recipesAPI = await response.json();
      if (!recipesAPI[route]) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      setRecipes(recipesAPI[route]);
      if (recipesAPI[route].length === 1) {
        const id = route === 'meals' ? 'idMeal' : 'idDrink';
        history.push(`/${route}/${recipesAPI[route][0][id]}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchRecipesCat(category, route) {
    try {
      const URL = `${setApiUrl(route)}filter.php?c=${category}`;
      const response = await fetch(URL);
      const recipesCat = await response.json();
      setRecipes(recipesCat[route]);
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

  const values = useMemo(() => ({
    recipes,
    recipeType,
    categories,
    fetchRecipes,
    setRecipeType,
    fetchCategories,
    fetchRecipesCat,
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
