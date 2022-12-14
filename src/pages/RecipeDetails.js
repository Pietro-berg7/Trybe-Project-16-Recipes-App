import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'prop-types';
import { Context } from '../context/useContext';
import Recommendations from '../components/Recommendations';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';

import {
  Main,
  Img,
  Content,
  ButtonStart,
  Ingredients,
  Share,
  Favorite,
} from './CSS/RecipeDetails.styled';

export default function RecipeDetails(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const { fetchRecipeId } = useContext(Context);
  const [recipe, setRecipe] = useState();
  const [startRecipeBtn, setStartRecipeBtn] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fetchRecipeById = async () => {
      const data = await fetchRecipeId(pathname);
      setRecipe(data);
    };
    fetchRecipeById();
  }, [setRecipe, fetchRecipeId, pathname, recipe]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress !== null) {
      const type = pathname.includes('drinks') ? 'drinks' : 'meals';

      if (inProgress[type] !== null && inProgress[type] !== undefined) {
        const exists = Object.keys(inProgress[type]).includes(id);
        setStartRecipeBtn(exists);
      }
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDone = recipeDone.find((element) => element.id === id) !== undefined;
    setDone(isDone);
  }, [pathname, id]);

  const handleStartRecipe = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  if (!recipe) return null;

  return (
    <Main>
      <Img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt=""
        width="100%"
      />
      <Content>
        <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
        <h3 data-testid="recipe-category">
          {recipe.strAlcoholic || recipe.strCategory}
        </h3>
        <h2>Ingredients</h2>
        <Ingredients>
          <div>
            {Object.entries(recipe)
              .filter((element) => element[0].includes('Ingredient'))
              .map((ingredient, index) => (
                (ingredient[1] !== '' && ingredient[1] !== null)
                && (
                  <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                    {ingredient[1]}
                  </p>
                )
              ))}
          </div>
          <div>
            {/* <h2>Measures</h2> */}
            {Object.entries(recipe)
              .filter((element) => element[0].includes('Measure'))
              .map((measure, index) => (
                (measure[1] !== '' && measure[1] !== null)
                && (
                  <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                    {measure[1]}
                  </p>
                )
              ))}
          </div>
        </Ingredients>
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <iframe
            title="video"
            data-testid="video"
            width="100%"
            src={ `https://www.youtube.com/embed/${
              recipe.strYoutube.split('=')[1]
            }` }
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div>
          {done ? null : (
            <ButtonStart
              data-testid="start-recipe-btn"
              type="button"
              style={ { position: 'fixed', bottom: '0px' } }
              onClick={ handleStartRecipe }
            >
              {startRecipeBtn ? <span>Continue Recipe</span> : <span>Start Recipe</span>}
            </ButtonStart>
          )}
        </div>
        <Share>
          <ButtonShare pathname={ pathname } />
        </Share>
        <Favorite>
          <ButtonFavorite pathname={ pathname } recipe={ recipe } id={ id } />
        </Favorite>
        <h2>Recommendations</h2>
        <Recommendations />
      </Content>
    </Main>
  );
}

RecipeDetails.propTypes = {
  match: object,
}.isRequired;
