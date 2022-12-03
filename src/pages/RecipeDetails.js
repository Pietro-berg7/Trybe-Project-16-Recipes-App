import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/useContext';

export default function Recipe() {
  const history = useHistory();
  const { pathname } = history.location;
  const { fetchRecipeId } = useContext(Context);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const fetchRecipeById = async () => {
      const data = await fetchRecipeId(pathname);
      setRecipe(data);
    };
    fetchRecipeById();
  }, [setRecipe, fetchRecipeId, pathname]);
  console.log(recipe);

  return (
    recipe && (
      <main>
        <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="" width="100%" />
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
        <h2>Ingredients</h2>
        <ul>
          {
            Object.entries(recipe)
              .filter((ingredient) => (ingredient[0].includes('Ingredient')))
              .filter((ingredient) => (ingredient[1] !== ''))
              .map((ingredient) => (
                <li
                  data-testid={ `${ingredient[0]}-ingredient-name-and-measure` }
                  key={ ingredient[0] }
                >
                  {ingredient[1]}
                </li>
              ))
          }
        </ul>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <iframe
          title="video"
          data-testid="video"
          width="100%"
          src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
          frameBorder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </main>
    )
  );
}
