import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Context } from '../context/useContext';

export default function RecipeCard(props) {
  const {
    index,
    recipeImage,
    recipeTitle,
    recipeId,
    redirectToDetails,
  } = props;

  const { setRecipeId } = useContext(Context);

  return (
    <button
      className="drink-card"
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => {
        redirectToDetails(recipeId);
        setRecipeId(recipeId);
      } }
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
