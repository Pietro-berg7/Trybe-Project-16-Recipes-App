import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareButton from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState(['meal', 'drink']);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(doneRecipes);
  }, []);

  return (
    <div>
      <Header />
      <div>Done Recipes</div>
      <div className="filter-container">
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter(['meal']) }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter(['drink']) }
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter(['meal', 'drink']) }
        >
          All
        </button>
      </div>
      <div className="recipes-container">
        {recipes.filter((recipe) => filter.includes(recipe.type)).map((recipe, i) => {
          const tags = recipe.tags.length > 1
            ? `${recipe.tags[0]}, ${recipe.tags[1]}` : recipe.tags[0];
          const topText = `${recipe.nationality} - ${recipe.category}`;
          return (
            <div key={ i } style={ { width: '100px' } }>
              <button
                type="button"
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              >
                <img
                  style={ { width: '100%' } }
                  src={ recipe.image }
                  alt="Imagem receita"
                  data-testid={ `${i}-horizontal-img` }
                />
              </button>
              <p data-testid={ `${i}-horizontal-top-text` }>
                {recipe.type === 'drink' ? recipe.alcoholicOrNot : topText}
              </p>
              <p data-testid={ `${i}-horizontal-name` }>{recipe.name}</p>
              <p data-testid={ `${i}-horizontal-done-date` }>{recipe.doneDate}</p>
              <p data-testid={ `${i}-horizontal-horizontal-tag` }>{tags}</p>
              <button
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
              >
                <img src={ shareButton } alt="Share" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
