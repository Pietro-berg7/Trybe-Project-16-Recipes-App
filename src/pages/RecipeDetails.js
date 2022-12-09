/* eslint-disable complexity */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import { Context } from '../context/useContext';
import Recommendations from '../components/Recommendations';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';

export default function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const { fetchRecipeId } = useContext(Context);
  const [recipe, setRecipe] = useState();
  const [startRecipeBtn] = useState(false);
  const done = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    const fetchRecipeById = async () => {
      const data = await fetchRecipeId(pathname);
      setRecipe(data);
    };
    fetchRecipeById();
  }, [setRecipe, fetchRecipeId, pathname, recipe]);

  useEffect(() => {
    const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (prevFavorites === null) {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    window.localStorage.setItem('doneRecipes', JSON.stringify([]));
  }, []);

  const handleStartRecipe = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  return (
    recipe && (
      <main>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt=""
          width="100%"
        />
        <h1 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h1>
        <h3 data-testid="recipe-category">
          { recipe.strAlcoholic || recipe.strCategory }
        </h3>
        <h2>Ingredients</h2>
        { Object.entries(recipe)
          .filter((element) => (element[0].includes('Ingredient')))
          .map((ingredient, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredient[1]}
            </p>
          ))}
        <h2>Measures</h2>
        { Object.entries(recipe)
          .filter((element) => (element[0].includes('Measure')))
          .map((measure, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {measure[1]}
            </p>
          ))}
        <h2>Instructions</h2>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        {recipe.strYoutube && (
          <iframe
            title="video"
            data-testid="video"
            width="100%"
            src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div>
          {
            done
              .includes(recipe.idMeal || recipe.idDrink)
              ? null
              : (
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                  style={ { position: 'fixed', bottom: '0px' } }
                  onClick={ handleStartRecipe }
                >
                  { startRecipeBtn ? ('Start Recipe') : ('Continue Recipe') }
                </button>
              )
          }
        </div>
        <ButtonShare pathname={ pathname } testid="btn-svg" />
        <ButtonFavorite pathname={ pathname } recipe={ recipe } id={ id } />
        <Recommendations />
      </main>
    )
  );
}

RecipeDetails.propTypes = {
  match: object,
}.isRequired;
