import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Card } from './CSS/RecipeCard.styled';

export default function RecipeCard(props) {
  const {
    index,
    recipeImage,
    recipeTitle,
    recipeId,
    redirectToDetails,
  } = props;

  const [loading, setLoading] = useState(true);
  const [hiddenChange, setHiddenChange] = useState(true);

  const onComplete = () => {
    setLoading(false);
    setHiddenChange(false);
  };

  return (
    <Card
      className="drink-card"
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => redirectToDetails(recipeId) }
    >
      {loading && <div className="skeleton" />}
      <img
        src={ recipeImage }
        alt="recipe thumbnail"
        data-testid={ `${index}-card-img` }
        width="50px"
        onLoad={ onComplete }
        hidden={ hiddenChange }
      />

      <h3 data-testid={ `${index}-card-name` }>{recipeTitle}</h3>

    </Card>

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
