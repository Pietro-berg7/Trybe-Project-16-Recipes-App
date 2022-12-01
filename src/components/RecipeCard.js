import React from 'react';
import propTypes from 'prop-types';

export default function RecipeCard(props) {
  const {
    index,
    recipeImage,
    recipeTitle,
    recipeId,
    redirectToDetails,
  } = props;

  return (
    <button
      className="drink-card"
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => redirectToDetails(recipeId) }
    >
      <img
        src={ recipeImage }
        alt="recipe thumbnail"
        data-testid={ `${index}-card-img` }
        width="50px"
      />
      <h3 data-testid={ `${index}-card-name` }>{recipeTitle}</h3>
    </button>
  );
}

RecipeCard.propTypes = {
  index: propTypes.number.isRequired,
  recipeImage: propTypes.string,
  recipeTitle: propTypes.string,
  recipeId: propTypes.string,
  redirectToDetails: propTypes.func,
};

RecipeCard.defaultProps = {
  recipeImage: '',
  recipeTitle: '',
  recipeId: '',
  redirectToDetails: () => {},
};
