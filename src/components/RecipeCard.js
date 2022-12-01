import React from 'react';
import propTypes from 'prop-types';

export default function RecipeCard(props) {
  const { index, recipeImage, recipeTitle } = props;

  return (
    <div className="drink-card" data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipeImage }
        alt="recipe thumbnail"
        data-testid={ `${index}-card-img` }
        width="50px"
      />
      <h3 data-testid={ `${index}-card-name` }>{recipeTitle}</h3>
    </div>
  );
}

RecipeCard.propTypes = {
  index: propTypes.number.isRequired,
  recipeImage: propTypes.string.isRequired,
  recipeTitle: propTypes.string.isRequired,
};
