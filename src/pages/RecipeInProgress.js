import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

// const mockMeal = {
//   strMeal: 'Corba',
//   strCategory: 'Side',
//   strArea: 'Turkish',
//   // eslint-disable-next-line max-len
//   strInstructions: 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
//   strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   strIngredient1: 'Lentils',
//   strIngredient2: 'Onion',
//   strIngredient3: 'Carrots',
//   strIngredient4: 'Tomato Puree',
//   strIngredient5: 'Cumin',
//   strIngredient6: 'Paprika',
//   strIngredient7: 'Mint',
//   strIngredient8: 'Thyme',
//   strIngredient9: 'Black Pepper',
//   strIngredient10: 'Red Pepper Flakes',
//   strIngredient11: 'Vegetable Stock',
//   strIngredient12: 'Water',
//   strIngredient13: 'Sea Salt',
//   strIngredient14: '',
//   strIngredient15: '',
//   strIngredient16: '',
//   strIngredient17: '',
//   strIngredient18: '',
//   strIngredient19: '',
//   strIngredient20: '',
//   strMeasure1: '1 cup ',
//   strMeasure2: '1 large',
//   strMeasure3: '1 large',
//   strMeasure4: '1 tbs',
//   strMeasure5: '2 tsp',
//   strMeasure6: '1 tsp ',
//   strMeasure7: '1/2 tsp',
//   strMeasure8: '1/2 tsp',
//   strMeasure9: '1/4 tsp',
//   strMeasure10: '1/4 tsp',
//   strMeasure11: '4 cups ',
//   strMeasure12: '1 cup ',
//   strMeasure13: 'Pinch',
//   strMeasure14: ' ',
//   strMeasure15: ' ',
//   strMeasure16: ' ',
//   strMeasure17: ' ',
//   strMeasure18: ' ',
//   strMeasure19: ' ',
//   strMeasure20: ' ',
// };

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
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

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
  }, [recipe]);

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
              >
                <input
                  type="checkbox"
                  id={ ing }
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
        onClick={ () => {} }
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
