import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const adjustIngredients = (obj) => {
  const ingArr = [];
  Object.entries(obj).forEach((entrie) => {
    if (entrie[0].includes('strIngredient') && entrie[1] !== '' && entrie[1] !== null) {
      const measure = entrie[0].replace('strIngredient', 'strMeasure');
      ingArr.push(`${entrie[1]} - ${obj[measure]}`);
    }
  });

  return ingArr;
};

export default function RecipeInProgress(props) {
  const { match: { params: { id }, url }, history } = props;
  const recType = url.includes('drinks') ? 'drinks' : 'meals';
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);

  const saveProgress = (ingIndex, checked) => {
    const stored = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let ingProgress = stored[recType][id];
    if (checked) {
      ingProgress.push(ingIndex);
    } else {
      ingProgress = ingProgress.filter((i) => i !== ingIndex);
    }
    const updatedStorage = {
      ...stored,
      [recType]: {
        ...stored[recType],
        [id]: [...ingProgress],
      },
    };
    setUsedIngredients(ingProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedStorage));
  };

  useEffect(() => {
    async function fetchRecipeById(route, recipeId) {
      try {
        const type = route.includes('drinks') ? 'thecocktaildb' : 'themealdb';
        const URL = `https://www.${type}.com/api/json/v1/1/lookup.php?i=${recipeId}`;

        const response = await fetch(URL);
        const data = await response.json();
        if (type === 'thecocktaildb') {
          setRecipe(data.drinks[0]);
          return;
        }
        setRecipe(data.meals[0]);
      } catch (e) {
        console.error(e);
      }
    }

    fetchRecipeById(url, id);
  }, [url, id]);

  useEffect(() => {
    setIngredients(adjustIngredients(recipe));
  }, [recipe, usedIngredients]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (stored !== null) {
      let newStoreObj = {};
      if (stored[recType] !== undefined) {
        if (stored[recType][id] !== undefined) {
          newStoreObj = stored;
          setUsedIngredients(stored[recType][id]);
        } else {
          newStoreObj = {
            ...stored,
            [recType]: {
              ...stored[recType],
              [id]: [],
            },
          };
        }
      } else {
        newStoreObj = {
          ...stored,
          [recType]: {
            [id]: [],
          },
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStoreObj));
    } else {
      const newStoreObj = {
        [recType]: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStoreObj));
    }
  }, [id, recType]);

  return (
    <div>
      <h1>Recipe In Progress</h1>
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        Back
      </button>
      <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h2>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="Recipe"
        width="100px"
      />
      <div>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {} }
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => {} }
        >
          Favoritar
        </button>
      </div>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      <ul>
        {
          ingredients.map((ing, index) => (
            <li key={ ing }>
              <label
                htmlFor={ ing }
                data-testid={ `${index}-ingredient-step` }
                style={
                  usedIngredients.includes(index.toString())
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' } : {}
                }
              >
                <input
                  type="checkbox"
                  id={ ing }
                  name={ index }
                  checked={ usedIngredients.includes(index.toString()) }
                  onChange={ (e) => saveProgress(e.target.name, e.target.checked) }
                />
                {ing}
              </label>
            </li>
          ))
        }
      </ul>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ ingredients.length !== usedIngredients.length }
        onClick={ () => {} }
        style={ { position: 'fixed', bottom: '0px' } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: propTypes.shape().isRequired,
  history: propTypes.shape().isRequired,
};
