import React from 'react';
import propTypes from 'prop-types';

export default function RecipeInProgress(props) {
  const { match: { params: { id } } } = props;

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <h2 data-testid="recipe-title">{id}</h2>
      <img
        data-testid="recipe-photo"
        src=""
        alt="Recipe"
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
      <p data-testid="recipe-category">Categoria</p>
      <span data-testid="instructions">
        Instruções
      </span>
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
};
