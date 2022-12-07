import React, { useEffect, useState } from 'react';
import { object, string } from 'prop-types';
import addFavorite from './helpers/addFavorite';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ButtonFavorite(props) {
  const { pathname, recipe } = props;
  const [favIcon, setFavIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    if (recipe) {
      const favoriteIcon = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        if (favorites.find((element) => (
          element.id === recipe.idDrink || element.id === recipe.idMeal))) {
          setFavIcon(blackHeartIcon);
        }
      };
      favoriteIcon();
    }
  });

  const handleFavorite = () => {
    const prev = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...prev,
      addFavorite(recipe, pathname),
    ]));
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      src={ favIcon }
      onClick={ handleFavorite }
    >
      <img src={ favIcon } alt="" />
    </button>
  );
}

ButtonFavorite.propTypes = {
  pathname: string,
  recipe: object,
}.isRequired;
