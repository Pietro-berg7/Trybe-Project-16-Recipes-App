import React, { useEffect, useState } from 'react';
import { object, string } from 'prop-types';
import addFavorite from './helpers/addFavorite';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ButtonFavorite(props) {
  const { pathname, recipe, id } = props;
  const [favIcon, setFavIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    const favoriteIcon = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favorites.find((element) => (element.id === id))) {
        setFavIcon(blackHeartIcon);
      }
    };
    favoriteIcon();
  });

  const handleFavorite = () => {
    const prev = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (prev.find((element) => (element.id === id))) {
      const remove = prev.filter((element) => (element.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
      setFavIcon(whiteHeartIcon);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...prev,
        addFavorite(recipe, pathname),
      ]));
      setFavIcon(blackHeartIcon);
    }
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
